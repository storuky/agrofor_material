class FilesController < ApplicationController
  def create
    images, documents = [], []

    params[:attachments].map do |attachment|
      if ["image/png", "image/jpg", "image/jpeg"].include?(attachment.content_type)
        images << current_user.images.create(file: attachment)
      else
        documents << current_user.documents.create(file: attachment)
      end
    end

    render json: {
      images: serialize(images, serializer: ImageSerializer),
      documents: serialize(documents, serializer: DocumentSerializer)
    }
  end

end
