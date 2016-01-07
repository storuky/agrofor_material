class CorrespondencesSerializer < ActiveModel::Serializer
  attributes :id, :type, :updated_at, :last_message, :new_messages, :users, :positions, :timestamp
  def positions
    object.position_ids.map do |position_id|
      PositionBase.find_from_cache(position_id, serializer: PositionSerializer)
    end
  end

  def users
    object.user_ids.map do |user_id|
      User.find_from_cache(user_id, serializer: UserSerializer)
    end
  end

  def timestamp
    object.updated_at.to_i
  end
end
