class Position < PositionBase
  include Cacheable
  has_many :offers, -> () {where("status != 'deleted' AND status != 'rejected'")}
  has_one :deal

  after_commit :regenerate_cache

  aasm :column => :status do
    state :opened, :initial => true
    state :in_process
    state :completed
    state :archived

    event :start_process do
      transitions :to => :in_process, :from => [:opened]
    end

    event :complete do
      transitions :to => :completed, :from => [:in_process]
    end

    event :move_to_archive do
      transitions :to => :archived, :from => [:opened]
    end

    event :open do
      transitions :to => :opened, :from => [:archived]
    end
  end

  def to_offer
    Offer.new self.attributes.except("type", "id", "created_at", "updated_at", "delta").update(from_position_id: id, status: 'active')
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
      currency: options[:currency],
      currency_id: options[:currency].id
    })
  end

  def offers_from_cache options={}
    Rails.cache.fetch("Position.offers_from_cache(#{self.id}, #{options})") do
      ActiveModel::ArraySerializer.new(self.offers.where(options), each_serializer: OfferSerializer).as_json
    end
  end


  class << self
    def pluck_all_fields
      Rails.cache.fetch("Position.pluck_all_fields(#{Company.current_company.id})") do
        self.pluck_fields
      end
    end

    def statuses
      Position.aasm.states.each_with_index.map do |state, index|
        {id: index, name: state.name, title: I18n.t("position.status.#{state.name.to_s}")}
      end
    end

    def accept_for_order 
      ["created_at", "trade_type_id", "option_id", "weight_etalon", "weight_min_etalon",
       "created_at DESC", "trade_type_id DESC", "option_id DESC", "weight_etalon DESC", "weight_min_etalon DESC"]
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete_matched(/User\.positions_from_cache\(#{self.user_id}\,/)
      Rails.cache.delete("Position.pluck_all_fields(#{Company.current_company.id})")
      Rails.cache.delete_matched(/PositionBase\.cache\.all/)
      Rails.cache.delete_matched(/PositionBase\.cache\.find\(#{self.id}\)/)
    end
    
end
