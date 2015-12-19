class FeedbackSerializer < ActiveModel::Serializer
  attributes *(Feedback.attribute_names - []), :author

  has_one :position

  def author
    object.author.as_json(only: [:id], methods: [:fullname])
  end
end
