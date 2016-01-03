class CorrespondenceSerializer < CorrespondencesSerializer
  attributes :correspondence_type, :updated_at, :users_ids, :positions_ids

  has_many :messages
end
