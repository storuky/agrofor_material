class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phones, :fullname, :avatar, :language, :currency,
             :website, :skype, :city, :address, :lat, :lng, :company, :currency_id, 
             :additional, :banned, :timezone, :country, :locale, :currency,
             :first_name, :last_name

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
