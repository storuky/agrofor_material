class CorrespondenceSerializer < CorrespondencesSerializer
  attributes :type, :updated_at, :messages, :deal

  def messages
    scope.serialize(object.messages.includes(:documents).limit(20), root: false)
  end

  def deal
    if type == "CorrespondencePosition"
      object.positions.first.deal
    end
  end
end
