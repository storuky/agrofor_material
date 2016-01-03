class MessageSerializer < ActiveModel::Serializer
  attributes *(Message.attribute_names - [])

  has_many :documents
end
