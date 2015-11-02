class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :url, :title

  def url
    object.file.url
  end
end
