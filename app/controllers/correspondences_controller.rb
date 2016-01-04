class CorrespondencesController < ApplicationController
  before_action :set_correspondence, only: [:send_message, :show]
  before_action :check_owner, only: [:send_message, :show]

  def index
    respond_to do |format|
      format.html
      format.json {
        render json: serialize(current_user.correspondences, serializer: CorrespondencesSerializer)
      }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: serialize(@correspondence, {serializer: CorrespondenceSerializer})
        @correspondence.mark_as_read(current_user.id)
      }
    end
  end

  def reset_counter
    @correspondence.mark_as_read(current_user.id)
    render json: {}
  end

  def create
    respond_to do |format|
      format.json {
        user_ids = [current_user.id, params[:user_id].to_i]
        unless @correspondence = CorrespondenceUser.between_users(user_ids)
          @correspondence = CorrespondenceUser.create(user_ids: user_ids)
        end
        render json: serialize(@correspondence, {serializer: CorrespondenceSerializer})
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
    render json: {}
  end

  private
    def set_correspondence
      @correspondence = Correspondence.find(params[:id])
    end

    def check_owner
      if @correspondence[:user_ids].exclude?(current_user.id)
        render json: {msg: "Переписка не найдена"}, status: 404
      end
    end
end
