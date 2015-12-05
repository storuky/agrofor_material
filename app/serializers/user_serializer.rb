class UserSerializer < ActiveModel::Serializer
  attributes :id, :fullname, :email, :phones, :city, :address, :lat, :lng, :company, :additional, :avatar

  def avatar
    if object.avatar
      {
        original: object.avatar.original.url,
        thumb: object.avatar.thumb.url
      }
    end
  end
end
