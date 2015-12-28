class Position < ActiveRecord::Base
  include AASM
  include Cacheable
  include FixSphinx

  default_scope {
    includes(:trade_type, :images, :documents, :user, :currency, :weight_dimension, :weight_min_dimension, :price_weight_dimension, :option, :category, :trade_type, option: [:category])
  }

  after_commit :regenerate_cache

  geocoded_by :address, :latitude  => :lat, :longitude => :lng

  before_save :set_category_id
  before_save :set_etalon
  before_save :set_index_field

  has_many :positions_offers, foreign_key: :offer_id
  has_many :positions, through: :positions_offers
  
  has_many :offers_positions, foreign_key: :position_id, class_name: PositionsOffer
  has_many :offers, through: :offers_positions
  
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


  aasm :column => :status do
    state :opened, :initial => true
    state :in_process
    state :completed
    state :archive

    event :start_process do
      transitions :to => :in_process, :from => [:opened]
    end

    event :complete do
      transitions :to => :completed, :from => [:in_process]
    end

    event :move_to_archive do
      transitions :to => :archive, :from => [:opened]
    end

    event :open do
      transitions :to => :opened, :from => [:archive]
    end
  end

  def contractor options = {}
    trade_type_contractor = {
      1 => 2,
      2 => 1
    }

    Position.new({
      trade_type_id: trade_type_contractor[trade_type_id],
      weight: weight,
      price: price * self.currency.get_rate(options[:currency].name),
      weight_dimension: weight_dimension,
      price_weight_dimension: price_weight_dimension,
      option_id: option_id,
      weight_min: weight_min,
      weight_min_dimension: weight_min_dimension,
    })
  end

  def self.pluck_fields
    self.distinct.pluck(:id, :lat, :lng, :trade_type_id, :option_id, :weight, :weight_dimension_id, :price, :currency_id, :price_weight_dimension_id)
  end

  def self.pluck_all_fields
    Rails.cache.fetch('Position.pluck_all_fields') do
      self.pluck_fields
    end
  end

  def self.look_for query = nil
    if query.try(:present?)
      ids = Position.search_for_ids query
      Position.where(id: ids)
    else
      Position
    end
  end

  def self.statuses
    Position.aasm.states.each_with_index.map do |state, index|
      {id: index, name: state.name, title: I18n.t('position.status.'+state.name.to_s)}
    end
  end

  def self.filter filters = []
    currencies = Currency.all_from_cache
    sql = []
    filters.each do |filter|
      user_currency = Currency.all_by_index_from_cache(serializer: CurrencySerializer)[filter[:currency_id]]
      
      query = {}
      query[:trade_type_id] = filter["trade_type_id"] if filter["trade_type_id"]
      query[:option_id] = filter["option_id"] if filter["option_id"]

      wd_cache = WeightDimension.all_by_index_from_cache(serializer: WeightDimensionSerializer)
      
      if filter["weight_from"] or filter["weight_to"]
        weight_from = (filter["weight_from"] || 0).to_f * wd_cache[filter["weight_from_dimension_id"].to_i][:convert] rescue 0
        weight_to = (filter["weight_to"] || Float::INFINITY).to_f * wd_cache[filter["weight_to_dimension_id"].to_i][:convert] rescue Float::INFINITY
        query[:weight_etalon] = (weight_from..weight_to)
      end

      if filter["price_from"] or filter["price_to"]
        price_from = (filter["price_from"] || 0).to_f / wd_cache[filter["price_from_weight_dimension_id"].to_i][:convert] rescue 0
        price_to = (filter["price_to"] || Float::INFINITY).to_f / wd_cache[filter["price_to_weight_dimension_id"].to_i][:convert] rescue Float::INFINITY

        price_sql = []
        currencies.each do |currency|
          converted_price_from = price_from / currency.get_rate(user_currency[:name])
          converted_price_to = price_to / currency.get_rate(user_currency[:name])
          position = Position.where currency_id: currency.id, price_etalon: (converted_price_from..converted_price_to)

          price_sql << position.to_sql.split("WHERE")[1]
        end

        price_sql = "(" + price_sql.join(" OR ") + ")"
      end

      in_radius_sql = ""
      if filter["coords"]
        lat = filter["coords"][0]
        lng = filter["coords"][1]
        bounded_by = filter["bounded_by"].values
        
        radius_of_earth = 6378.137
        
        radius = filter["radius"].present? ? filter["radius"].to_i : 10

        a = "SIN((positions.lat-#{lat})*PI()/360)  *  SIN((positions.lat-#{lat})*PI()/360)  +  COS(#{lat}*PI()/180) * COS(positions.lat*PI()/180) * SIN((positions.lng-#{lng})*PI()/360) * SIN((positions.lng-#{lng})*PI()/360)"
        in_radius_sql = %{
          #{radius} >= 2 * ATAN2(SQRT(#{a}), SQRT(1-#{a})) * #{radius_of_earth}
        }
      end

      sql << self.where(query).where(price_sql).where(in_radius_sql).to_sql.split("WHERE")[1]
    end
    self.where sql.join(" OR ")

  end

  # def self.measure lat1, lon1, lat2=37.620393, lon2=55.75396
  #   r = 6378.137;
  #   dLat = (lat2 - lat1) * Math::PI / 180;
  #   dLon = (lon2 - lon1) * Math::PI / 180;
  #   a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  #   Math.cos(lat1 * Math::PI / 180) * Math.cos(lat2 * Math::PI / 180) *
  #   Math.sin(dLon/2) * Math.sin(dLon/2)
  #   c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  #   r * c
  # end

  def self.find_suitable positions
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

    #
    # BEFORE ACTION
    #

    def set_category_id
      self.category_id = Option.all_by_index_from_cache[option_id].category_id
    end

    def set_index_field
      temp = [self.title, self.description]
      [:en, :ru].each do |locale|
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

    def regenerate_cache
      Rails.cache.delete("User.positions_from_cache(#{self.user_id})")
      Rails.cache.delete("Position.pluck_all_fields")
    end
end
