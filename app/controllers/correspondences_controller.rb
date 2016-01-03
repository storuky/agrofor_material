class CorrespondencesController < ApplicationController
  before_action :set_serialized_correspondence, only: [:show]
  before_action :set_correspondence, only: [:send_message]
  before_action :check_owner, only: [:send_message, :show]

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: User.correspondences_from_cache(current_user.id)
      }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: @correspondence
      }
    end
  end

  def create
    respond_to do |format|
      format.json {
        user_ids = [current_user.id, params[:user_id].to_i]
        @correspondence = Correspondence.create(user_ids: user_ids, users_ids: user_ids)
        render json: @correspondence
      }
    end
  end

  def send_message
    @message = Message.create(
      correspondence_id: params[:id],
      body: params[:body],
      user_id: current_user.id,
      document_ids: (params[:document_ids] || [])
    )
    @correspondence.update(last_message: @message.body)
    render json: @message
  end

  private
    def set_serialized_correspondence
      @correspondence = Correspondence.find_from_cache(params[:id], serializer: CorrespondenceSerializer)
    end

    def set_correspondence
      @correspondence = Correspondence.find_from_cache(params[:id])
    end

    def check_owner
      if @correspondence[:users_ids].exclude?(current_user.id)
        render json: {msg: "Переписка не найдена"}, status: 404
      end
    end
end
