class DocumentsController < ApplicationController
  def create
    documents = params[:attachments].map do |attachment|
      document = current_user.documents.new(file: attachment)
      if document.save
        document
      else
        nil
      end
    end

    render json: documents.compact, each_serializer: DocumentSerializer, root: false
  end

  def destroy
    current_user.documents.find(params[:id]).destroy
    render json: {}
  end

end
