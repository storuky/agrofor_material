class PositionBase < ActiveRecord::Base
  include AASM
  include Cacheable
  include FixSphinx

  default_scope {
    includes(:trade_type, :images, :documents, :user, :currency, :weight_dimension, :weight_min_dimension, :price_weight_dimension, :option, :category, :trade_type, option: [:category])
  }
  
  has_many :imageable, as: :imageable
  has_many :images, through: :imageable
  
  has_many :documentable, as: :documentable
  has_many :documents, through: :documentable
  
  has_many :correspondence_positions
  has_many :correspondences, through: :correspondence_positions, source: :correspondence

  has_many :favorite_positions, foreign_key: :position_id
  has_many :users, through: :favorite_positions, source: :user
  
  belongs_to :user
  belongs_to :currency
  belongs_to :weight_dimension
  belongs_to :weight_min_dimension, class_name: WeightDimension
  belongs_to :price_weight_dimension, class_name: WeightDimension
  belongs_to :option
  belongs_to :category
  belongs_to :trade_type

  @@trade_types_ids = TradeType.pluck(:id) rescue []
  @@dimensions_ids =  WeightDimension.pluck(:id) rescue []
  @@options_ids =  Option.pluck(:id) rescue []

  @@fields_for_pluck = ["id", "lat", "lng", "trade_type_id", "option_id", "weight", "weight_dimension_id", "price", "currency_id", "price_weight_dimension_id", "weight_min", "weight_min_dimension_id", "created_at", "type"]

  validates_presence_of :trade_type_id, :title, :address, :option_id, :weight, :price

  validates :trade_type_id, inclusion: { in: @@trade_types_ids }
  validates :option_id, inclusion: { in: @@options_ids }
  validates :weight_dimension_id, inclusion: { in: @@dimensions_ids }
  validates :price_weight_dimension_id, inclusion: { in: @@dimensions_ids }
  validates :weight, numericality: { greater_than: 0 }
  validates :weight_min, numericality: { greater_than_or_equal_to: 0 }
  validate :less_then_weight
  validate :location
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :price_discount, :allow_blank => true, numericality: { greater_than_or_equal_to: 5, less_than_or_equal_to: 50 }

  
  before_save :set_category_id
  before_save :set_etalon
  before_save :set_index_field

  def pluck_fields with=[]
    ap @@fields_for_pluck
    self.attributes.slice(*@@fields_for_pluck, *with).values
  end

  class << self
    def pluck_fields with=[]
      self.pluck(*@@fields_for_pluck, *with)
    end

    def look_for query = nil
      if query.try(:present?)
        ids = Position.search_for_ids query
        Position.where(id: ids)
      else
        Position
      end
    end

    def filter filters = []
      currencies = Currency.all_from_cache
      sql = []

      filters.first(10).each do |filter|
        unless filter["checked_positions_ids"].try(:any?)
          user_currency = Currency.all_by_index_from_cache(serializer: CurrencySerializer)[filter[:currency_id].to_i]
          wd_cache = WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)

          trade_type_id = filter["trade_type_id"] if filter["trade_type_id"]
          if trade_type_id
            trade_type_query = "AND \"position_bases\".\"trade_type_id\" = #{trade_type_id}"
          end

          option_id = filter["option_id"] if filter["option_id"]
          weight_from = (filter["weight_from"] || 0).to_f * wd_cache[filter["weight_from_dimension_id"].to_i][:convert] rescue 0
          weight_to = (filter["weight_to"] || 9999999999.0).to_f * wd_cache[filter["weight_to_dimension_id"].to_i][:convert] rescue 9999999999.0

          price_sql = "1=1"
          if filter["price_from"] or filter["price_to"]
            price_from = (filter["price_from"] || 0).to_f / wd_cache[filter["price_from_weight_dimension_id"].to_i][:convert] rescue 0
            price_to = (filter["price_to"] || 9999999999.0).to_f / wd_cache[filter["price_to_weight_dimension_id"].to_i][:convert] rescue 9999999999.0

            price_sql = []
            currencies.each do |currency|
              converted_price_from = price_from / currency.get_rate(user_currency[:name])
              converted_price_to = price_to / currency.get_rate(user_currency[:name])
              price_sql << "(\"position_bases\".\"currency_id\" = #{currency.id} AND (\"position_bases\".\"price_etalon\" BETWEEN #{converted_price_from} AND #{converted_price_to}))"
            end
            price_sql = price_sql.join(" OR ")
          end

          in_radius_sql = "1=1"
          if filter["coords"]
            lat = filter["coords"][0]
            lng = filter["coords"][1]
            
            radius_of_earth = 6378137
            
            radius = filter["radius"].present? ? filter["default_radius"].to_f + (filter["radius"].to_f * 1000) : filter["default_radius"].to_f

            a = "SIN((positions.lat-#{lat})*PI()/360)  *  SIN((positions.lat-#{lat})*PI()/360)  +  COS(#{lat}*PI()/180) * COS(positions.lat*PI()/180) * SIN((positions.lng-#{lng})*PI()/360) * SIN((positions.lng-#{lng})*PI()/360)"
            in_radius_sql = %{
              #{radius} >= 2 * ATAN2(SQRT(#{a}), SQRT(1-#{a})) * #{radius_of_earth}
            }
          end

          sql << "(\"position_bases\".\"status\" = 'opened') AND (#{in_radius_sql}) AND (#{price_sql}) AND (\"position_bases\".\"option_id\" = #{option_id} #{trade_type_query} AND (\"position_bases\".\"weight_etalon\" BETWEEN #{weight_from} AND #{weight_to}))"

        end

        if filter["checked_positions_ids"].try(:any?)
          suitable_positions = Position.find_suitable filter["checked_positions_ids"]
          sql << suitable_positions.to_sql.split("WHERE")[1]
        end
      end
      
      self.where sql.join(" OR ")
    end

    def find_suitable position_ids
      filters = [position_ids].flatten.map do |position_id|
        position = Position.find_from_cache(position_id)

        res = {
          option_id: position.option_id,
          weight_from: position.weight_min,
          weight_from_dimension_id: position.weight_min_dimension_id,
          currency_id: position.currency_id
        }

        res[:trade_type_id] = TradeType.all_by_index_from_cache[position.trade_type_id].trade_type_id

        if position.trade_type_id == 1
          res[:price_to] = position.price * (1 + position.price_discount/100.0)
          res[:price_to_weight_dimension_id] = position.price_weight_dimension_id
        elsif position.trade_type_id == 2
          res[:price_from] = position.price * (1 - position.price_discount/100.0)
          res[:price_from_weight_dimension_id] = position.price_weight_dimension_id
        end
        res.with_indifferent_access
      end

      self.filter filters
    end

    def measure lat1, lon1, lat2, lon2
      r = 6378.137;
      dLat = (lat2 - lat1) * Math::PI / 180;
      dLon = (lon2 - lon1) * Math::PI / 180;
      a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math::PI / 180) * Math.cos(lat2 * Math::PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      r * c
    end
  end


  private

    #
    # ERRORS
    #

    def less_then_weight
      errors.add(:weight_min) if WeightDimension.normalize(self.weight_min, self.weight_min_dimension_id) > WeightDimension.normalize(self.weight, self.weight_dimension_id)
    end

    def location
      errors.add(:lat) unless self.lat && self.lng
    end

    def set_category_id
      self.category_id = Option.all_by_index_from_cache[option_id].category_id
    end

    def set_index_field
      temp = [self.title, self.description]
      [:en, :ru].each do |locale|
        # temp << I18n.t('position.trade_types', :locale => locale)[self.trade_type_id]
        temp << I18n.t('category.'+self.option.category.title, :locale => locale)
        temp << I18n.t('option.'+Option.all_by_index_from_cache[option_id].title, :locale => locale)
      end
      self.index_field = temp.join(" ")
    end

    def set_etalon
      self.price = self.price.round(2)
      self.weight_etalon = self.weight * WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.weight_dimension_id][:convert]
      self.weight_min_etalon = self.weight_min * WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.weight_min_dimension_id][:convert]
      self.price_etalon = self.price / WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.price_weight_dimension_id][:convert]
    end
end
