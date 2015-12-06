class UserSerializer < ActiveModel::Serializer
  attributes *(User.attribute_names - []), :avatar

  def avatar
    if object.avatar
      {
        original: object.avatar.original.url,
        thumb: object.avatar.thumb.url
      }
    end
  end
end
