class CorrespondencesSerializer < ActiveModel::Serializer
  attributes :id, :type, :updated_at, :last_message, :new_messages, :opponent, :positions, :timestamp
  def positions
    object.position_ids.map do |position_id|
      PositionBase.find_from_cache(position_id, serializer: PositionSerializer)
    end
  end

  def opponent
    user_id = object.user_ids - [scope.current_user.id]
    User.find_from_cache(user_id[0], serializer: UserSerializer)
  end

  def timestamp
    object.updated_at.to_i
  end
end
