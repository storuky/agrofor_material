class ProfileController < ApplicationController
  before_action :set_serialized_user, only: [:show]

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
        if params[:id].to_i == current_user.id
          if user_params[:language] != current_user.language
            @translations = translations user_params[:language]
          end
          current_user.update(user_params)
          set_serialized_user
          render json: {msg: "Профиль успешно обновлен", user: @user, translations: @translations}
        else
          render json: {msg: "Профиль не найден"}, status: 422
        end
      }
    end
  end

  def positions
    respond_to do |format|
      format.json {
        @positions = User.positions_from_cache(params[:id])
        render json: Oj.dump(@positions)
      }
    end
  end

  def feedbacks
    respond_to do |format|
      format.json {
        @feedbacks = User.feedbacks_from_cache(params[:id])
        render json: Oj.dump(@feedbacks)
      }
    end
  end

  private
    def set_user
      @user = User.find_from_cache params[:id]
    end

    def set_serialized_user
      @user = User.find_from_cache params[:id], serializer: UserSerializer
    end

    def user_params
      params.require(:user).permit(
        :first_name,
        :last_name,
        :company,
        :country,
        :currency_id,
        :language,
        :address,
        :additional,
        :website,
        :skype,
        :lat,
        :lng,
        :function
      ).merge({
        phones: (params[:user][:phones].select{|i| i.present?} rescue nil),
        interest_ids: (params[:user][:interests].map{|i| i[:id]} rescue nil),
      })
    end
end
