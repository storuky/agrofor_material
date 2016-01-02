class PositionBase < ActiveRecord::Base
  include AASM
  include Cacheable
  include FixSphinx

  require 'benchmark'

  default_scope {
    includes(:trade_type, :images, :documents, :user, :currency, :weight_dimension, :weight_min_dimension, :price_weight_dimension, :option, :category, :trade_type, option: [:category])
  }
  
  has_many :images
  has_many :documents
  
  has_many :correspondence_positions, :inverse_of => :position
  has_many :correspondences, through: :correspondence_positions
  
  belongs_to :user
  belongs_to :currency
  belongs_to :weight_dimension
  belongs_to :weight_min_dimension, class_name: WeightDimension
  belongs_to :price_weight_dimension, class_name: WeightDimension
  belongs_to :option
  belongs_to :category
  belongs_to :trade_type

  @@trade_types_ids = TradeType.pluck(:id)
  @@dimensions_ids =  WeightDimension.pluck(:id)
  @@options_ids =  Option.pluck(:id)

  validates_presence_of :trade_type_id, :title, :address, :option_id, :weight, :price

  validates :trade_type_id, inclusion: { in: @@trade_types_ids }
  validates :option_id, inclusion: { in: @@options_ids }
  validates :weight, numericality: { greater_than: 0 }
  validates :weight_min, numericality: { greater_than_or_equal_to: 0 }
  validates :weight_dimension_id, inclusion: { in: @@dimensions_ids }
  validate :less_then_weight
  validate :location
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :price_weight_dimension_id, inclusion: { in: @@dimensions_ids }
  validates :price_discount, :allow_blank => true, numericality: { greater_than_or_equal_to: 5, less_than_or_equal_to: 50 }

  
  before_save :set_category_id
  before_save :set_etalon
  before_save :set_index_field

  class << self
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

          query = {}
          query[:trade_type_id] = filter["trade_type_id"] if filter["trade_type_id"]
          query[:option_id] = filter["option_id"] if filter["option_id"]

          wd_cache = WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)
          
          if filter["weight_from"] or filter["weight_to"]
            weight_from = (filter["weight_from"] || 0).to_f * wd_cache[filter["weight_from_dimension_id"].to_i][:convert] rescue 0
            weight_to = (filter["weight_to"] || 9999999999.0).to_f * wd_cache[filter["weight_to_dimension_id"].to_i][:convert] rescue 9999999999.0
            query[:weight_etalon] = (weight_from..weight_to)
          end

          if filter["price_from"] or filter["price_to"]
            price_from = (filter["price_from"] || 0).to_f / wd_cache[filter["price_from_weight_dimension_id"].to_i][:convert] rescue 0
            price_to = (filter["price_to"] || 9999999999.0).to_f / wd_cache[filter["price_to_weight_dimension_id"].to_i][:convert] rescue 9999999999.0

            price_sql = []
            currencies.each do |currency|
              converted_price_from = price_from / currency.get_rate(user_currency[:name])
              converted_price_to = price_to / currency.get_rate(user_currency[:name])
              price_sql << "(\"position_bases\".\"currency_id\" = #{currency.id} AND \"position_bases\".\"status\" = 'opened' AND (\"position_bases\".\"price_etalon\" BETWEEN #{converted_price_from} AND #{converted_price_to}))"
            end
            price_sql = price_sql.join(" OR ")
          end

          in_radius_sql = ""
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


          sql << self.where(query).where(price_sql).where(in_radius_sql).to_sql.split("WHERE")[1]
        end

        if filter["checked_positions_ids"].try(:any?)
          suitable_for_positions = Position.where(id: filter["checked_positions_ids"])
          suitable_positions = Position.find_suitable(suitable_for_positions)
          sql << suitable_positions.to_sql.split("WHERE")[1]
        end
      end
      
      self.where sql.join(" OR ")
    end

    def find_suitable positions
      filters = [positions].flatten.map do |position|
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
        temp << (self.address || "")
        temp << I18n.t('position.dictionary.trade_types', :locale => locale)[self.trade_type_id]
        temp << I18n.t('category.items.'+self.option.category.title, :locale => locale)
        temp << I18n.t('option.'+Option.all_by_index_from_cache[option_id].title, :locale => locale)
      end
      self.index_field = temp.join(" ")
    end

    def set_etalon
      self.weight_etalon = self.weight * WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.weight_dimension_id][:convert]
      self.weight_min_etalon = self.weight_min * WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.weight_min_dimension_id][:convert]
      self.price_etalon = self.price / WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)[self.price_weight_dimension_id][:convert]
    end
end
