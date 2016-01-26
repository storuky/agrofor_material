class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  skip_before_action :user_needed
  before_action :check_fields, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    if self.resource
      sign_in(resource_name, self.resource)
      render json: {}
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

  def check_fields
    params[:user] ||= {}
    
    if !params[:user][:email]
      errors = {email: ["не может быть пустым"]}
      render json: {msg: "Укажите адрес эл. почты", errors: errors}, status: 401
    elsif !params[:user][:password]
      errors = {password: ["не может быть пустым"]}
      render json: {msg: "Укажите пароль", errors: errors}, status: 401
    end
  end
end
