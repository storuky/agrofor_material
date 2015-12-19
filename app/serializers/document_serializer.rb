class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :url, :filename, :extension

  def url
    object.file.url
  end

  def extension
    object.file.file.extension.downcase
  end
end
