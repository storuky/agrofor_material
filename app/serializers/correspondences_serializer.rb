class CorrespondencesSerializer < ActiveModel::Serializer
  attributes :id, :correspondence_type, :updated_at, :last_message, :messages_count

  has_many :positions
  has_many :users
end
