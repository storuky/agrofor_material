class UserSerializer < ActiveModel::Serializer
  attributes *(User.attribute_names - []), :avatar, :language, :currency

  has_many :interests

  def avatar
    if object.avatar
      {
        original: object.avatar.original.url,
        thumb: object.avatar.thumb.url
      }
    end
  end

  def currency
    object.currency.try(:name)
  end
end
