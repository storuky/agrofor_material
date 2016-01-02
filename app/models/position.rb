class Position < PositionBase
  has_many :offers

  after_commit :regenerate_cache

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

  def to_offer
    Offer.new self.attributes.except("type", "id", "created_at", "updated_at", "delta").update(from_position_id: id)
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


  class << self
    def pluck_fields
      self.distinct.pluck(:id, :lat, :lng, :trade_type_id, :option_id, :weight, :weight_dimension_id, :price, :currency_id, :price_weight_dimension_id)
    end

    def pluck_all_fields
      Rails.cache.fetch('Position.pluck_all_fields') do
        self.pluck_fields
      end
    end

    def statuses
      Position.aasm.states.each_with_index.map do |state, index|
        {id: index, name: state.name, title: I18n.t('position.status.'+state.name.to_s)}
      end
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete_matched(/User\.positions_from_cache\(#{self.user_id}\,/)
      Rails.cache.delete("Position.pluck_all_fields")
    end
    
end
