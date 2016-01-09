class Offer < PositionBase
  after_commit :regenerate_cache

  belongs_to :position, touch: true

  validate :trade_type_validate
  validate :user_validate
  validate :option_validate
  validate :price_validate
  validate :weight_validate

  after_create :create_correspondence_and_ws
  
  before_update :send_message

  aasm :column => :status do
    state :active, :initial => true
    state :rejected
    state :deleted

    event :delete do
      transitions :to => :deleted, :from => [:active]
    end

    event :reject do
      transitions :to => :rejected, :from => [:active]
    end
  end

  class << self
    def statuses
      Offer.aasm.states.each_with_index.map do |state, index|
        {id: index, name: state.name, title: I18n.t("offer.status.#{state.name.to_s}")}
      end
    end

  end

  private
    def trade_type_validate
      errors.add(:trade_type_id, "Совпадает тип позиции") if position.trade_type_id == trade_type_id
    end

    def user_validate
      errors.add(:user_id, "Нельзя заключить сделку с собой") if position.user_id == user_id
    end

    def option_validate
      errors.add(:option_id, "Товары в позициях не совпадают") if position.option_id != option_id
    end

    def price_validate
      set_etalon
      price_in_currency = position.price_etalon * position.currency.get_rate(currency.name)

      if position.trade_type_id == 1
        price_in_currency *= 1 + position.price_discount/100.0
        errors.add(:price, "Цена предожения слишком большая") unless price_etalon.between?(0.0, price_in_currency)
      elsif position.trade_type_id == 2
        price_in_currency *= 1 - position.price_discount/100.0
        errors.add(:price, "Цена предожения слишком маленькая") unless price_etalon.between?(price_in_currency, Float::INFINITY)
      end
    end

    def weight_validate
      errors.add(:weight, "Предлагаемый вес ниже мин. заказа в позиции") if weight_etalon < position.weight_min_etalon
    end

    def regenerate_cache
      Rails.cache.delete_matched(/User\.offers_from_cache\(#{user_id}\,/)
      Rails.cache.delete_matched(/Position\.offers_from_cache\(#{position_id}\,/)
    end

    def create_correspondence_and_ws
      position_ids = [id, position_id]
      user_ids = [user_id, position.user_id]
      @correspondence = CorrespondencePosition.where("user_ids @> ARRAY[?]::integer[] AND position_ids @> ARRAY[?]::integer[]", user_ids, [position_id]).last
      unless @correspondence
        @correspondence = CorrespondencePosition.create(user_ids: user_ids, position_ids: position_ids)
      end

      position.user.increment!(:new_offers_count)
      offer = OfferSerializer.new(self, root: false).as_json
      @correspondence.messages.create(message_type: "new_offer", body: "Service message", user_id: user_id, offer: self.pluck_fields)
      PrivatePub.publish_to "/stream/#{position.user_id}", {offer: offer}
    end

    def send_message
      position_ids = [id, position_id]
      @correspondence = CorrespondencePosition.between_positions(position_ids)

      if status == 'deleted'
        message_type = 'delete_offer'
        @correspondence.messages.create(message_type: "delete_offer", body: "Service message", user_id: user_id)
      else
        if price_etalon_changed? or weight_etalon_changed? or weight_min_etalon_changed?
          @correspondence.messages.create(message_type: 'change_offer', body: "Service message", user_id: user_id, offer: self.pluck_fields)
        end
      end

    end
end
