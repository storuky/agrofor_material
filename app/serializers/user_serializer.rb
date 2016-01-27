class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :phones, :fullname, :avatar, :language, :currency,
             :website, :skype, :city, :address, :lat, :lng, :company, :currency_id, 
             :additional, :banned, :timezone, :country, :locale, :currency,
             :first_name, :last_name, :function, :confirmed

  has_many :interests
  has_one :avatar, serializer: ImageSerializer

  def currency
    object.currency.try(:name)
  end

  def confirmed
    !!object.confirmed_at
  end
end
