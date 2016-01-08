class FilesController < ApplicationController
  def create
    images, documents, errors = [], [], []

    params[:attachments].map do |attachment|
      if ["image/png", "image/jpg", "image/jpeg"].include?(attachment.content_type)
        image = current_user.images.new(file: attachment)
        if image.save
          images << image
        else
          documents << current_user.documents.create(file: attachment)
        end
      else
        documents << current_user.documents.create(file: attachment)
      end
    end

    result = {
      images: serialize(images, serializer: ImageSerializer),
      documents: serialize(documents, serializer: DocumentSerializer)
    }

    render json: Oj.dump(result)
  end
end
