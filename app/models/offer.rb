class Offer < PositionBase
  belongs_to :position

  after_commit :regenerate_cache

  belongs_to :position, touch: true
  belongs_to :offer, touch: true

  validate :trade_type_validate
  validate :user_validate
  validate :status_validate
  validate :option_validate
  validate :price_validate
  validate :weight_validate

  class << self
    def statuses
      [
        {
          id: 1, title: "Новые",
        },
        {
          id: 2, title: "Отклоненные",
        }
      ]
    end
  end

  private
    def trade_type_validate
      errors.add(:trade_type_id, "Совпадает тип позиции") if position.trade_type_id == trade_type_id
    end

    def user_validate
      errors.add(:user_id, "Нельзя заключить сделку с собой") if position.user_id == user_id
    end

    def status_validate
      errors.add(:status, "Статус обеих позиции должен быть «Открыто»") if (position.status != 'opened') or (position.status != 'opened')
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
      Rails.cache.delete("User.offers_from_cache(#{id})_#{I18n.locale}")
    end
end
