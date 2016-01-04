class CorrespondenceSerializer < CorrespondencesSerializer
  attributes :type, :updated_at, :messages

  def messages
    scope.serialize(object.messages.includes(:documents).limit(20), root: false)
  end

end
