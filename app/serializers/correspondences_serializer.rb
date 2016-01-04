class CorrespondencesSerializer < ActiveModel::Serializer
  attributes :id, :type, :updated_at, :last_message, :new_messages, :users, :positions, :timestamp
  def positions
    object.position_ids.map do |position_id|
      PositionBase.find_from_cache(position_id, serializer: PositionSerializer)
    end
  end

  def users
    User.find_from_cache(object.user_ids, serializer: UserSerializer)
  end

  def timestamp
    object.updated_at.to_i
  end
end
