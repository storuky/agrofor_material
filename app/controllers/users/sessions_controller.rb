class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  skip_before_action :user_needed

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    if self.resource
      sign_in(resource_name, self.resource)
      render json: {
        current_user: self.resource.info,
        favorite_ids: self.resource.favorite_ids,
        channel: PrivatePub.subscription(:channel => "/stream/#{self.resource.id}").as_json,
        settings: {
          locale: I18n.locale,
          currency: (serialize(current_user.currency) rescue Currency.all_by_index_from_cache(serializer: CurrencySerializer)[1])
        }
      }
    else
      render json: {msg: "Email или пароль указаны неверно"}, status: 401
    end
  end

  # DELETE /resource/sign_out
  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    render json: {msg: "Осуществлен выход из системы"}
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
