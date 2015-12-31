class PositionBase < ActiveRecord::Base
  include AASM
  include Cacheable
  include FixSphinx

  # default_scope {
  #   includes(:trade_type, :images, :documents, :user, :currency, :weight_dimension, :weight_min_dimension, :price_weight_dimension, :option, :category, :trade_type, option: [:category])
  # }
  
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



  def self.measure lat1, lon1, lat2, lon2
    r = 6378.137;
    dLat = (lat2 - lat1) * Math::PI / 180;
    dLon = (lon2 - lon1) * Math::PI / 180;
    a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math::PI / 180) * Math.cos(lat2 * Math::PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    r * c
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
