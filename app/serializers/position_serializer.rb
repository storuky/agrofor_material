class PositionSerializer < ActiveModel::Serializer
  attributes *(Position.attribute_names - []), :user, :status, :trade_type,
                                               :currency, :weight_dimension,
                                               :weight_min_dimension, :price_weight_dimension,
                                               :lat, :lng, :address, :currency_id

  has_one :option, serializer: OptionSerializer
  has_one :weight_dimension
  has_one :weight_min_dimension
  has_many :images, serializer: ImageSerializer
  has_many :documents, serializer: DocumentSerializer

  def user
    if object.user
      {
        id: object.user.id,
        fullname: object.user.fullname,
        avatar: (object.user.avatar.file.thumb.url rescue nil)
      }
    end
  end

  def status
    if object.status
      {
        id: object.status,
        title: I18n.t("#{object.type.downcase}.status")[object.try(:status).try(:to_sym)]
      }
    else
      nil
    end
  end

  def trade_type
    {
      id: object.trade_type_id,
      title: I18n.t("trade_type")[object.trade_type.try(:title).try(:to_sym)]
    }
  end

  def currency_id
    object.currency_id || scope.current_user.currency_id
  end

  def currency
    {
      id: object.currency_id || scope.current_user.currency_id,
      title: I18n.t("currency")[object.currency.try(:name).try(:to_sym)] || I18n.t("currency")[scope.current_user.currency.try(:name).try(:to_sym)]
    }
  end

  def weight_min_dimension
    {
      id: object.weight_min_dimension_id,
      title: I18n.t("weight_dimension")[object.weight_min_dimension.try(:name).try(:to_sym)],
    }
  end

  def weight_dimension
    {
      id: object.weight_dimension_id,
      title: I18n.t("weight_dimension")[object.weight_dimension.try(:name).try(:to_sym)]
    }
  end

  def price_weight_dimension
    {
      id: object.price_weight_dimension_id,
      title: I18n.t("weight_dimension")[object.price_weight_dimension.try(:name).try(:to_sym)]
    }
  end

  def lat
    object.lat || scope.current_user.lat
  end

  def lng
    object.lng || scope.current_user.lng
  end

  def address
    object.address || scope.current_user.address
  end
end
