class ImagesController < ApplicationController
  def create
    images = params[:attachments].map do |attachment|
      image = current_user.images.new(file: attachment)
      if image.save
        image
      else
        nil
      end
    end

    render json: images.compact, each_serializer: ImageSerializer, root: false
  end

  def destroy
    current_user.images.find(params[:id]).destroy
    render json: {}
  end
end
