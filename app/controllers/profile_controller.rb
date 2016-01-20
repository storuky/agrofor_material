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
            update_translations = true
            I18n.locale = user_params[:language].to_sym
          end

          if user_params[:currency_id] != current_user.currency_id
            update_currency = true
          end

          current_user.update(user_params)
          set_serialized_user
          render json: {msg: "Профиль успешно обновлен", user: @user, update_translations: update_translations, update_currency: update_currency}
        else
          render json: {msg: "Профиль не найден"}, status: 422
        end
      }
    end
  end

  def positions
    respond_to do |format|
      format.json {
        @positions = User.find_from_cache(params[:id]).positions
        @positions = order_positions(@positions).pluck_fields.uniq
        render json: Oj.dump({collection: @positions})
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
