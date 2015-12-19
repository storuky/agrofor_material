class ProfileController < ApplicationController
  before_action :set_user, only: [:show, :update]

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: @user
      }
    end
  end

  def update
    respond_to do |format|
      format.json {
        if @user[:id] == current_user.id
          current_user.update(user_params)
        else
          render json: {msg: "Профиль не найден"}
        end
      }
    end
  end

  def positions
    respond_to do |format|
      format.json {
        @positions = ActiveModel::ArraySerializer.new(Position.where(user_id: params[:id]), each_serializer: PositionSerializer)
        render json: Oj.dump(@positions)
      }
    end
  end

  def feedbacks
    respond_to do |format|
      format.json {
        @feedbacks = ActiveModel::ArraySerializer.new(Feedback.where(user_id: params[:id]), each_serializer: FeedbackSerializer)
        render json: Oj.dump(@feedbacks)
      }
    end
  end

  private
    def set_user
      @user = User.find_from_cache(params[:id], serializer: UserSerializer)
    end

    def user_params
      params.permit(:first_name, :last_name, :company, :address, :additional, phones: [])
    end
end
