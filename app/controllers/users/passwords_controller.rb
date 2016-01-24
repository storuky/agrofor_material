class Users::PasswordsController < DeviseController
  skip_before_action :user_needed

  def create
    result = Rails.cache.fetch("send_reset_password_instructions(#{resource_params[:email]})", expires_in: 1.minute) do
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?

      if successfully_sent?(resource)
        {msg: "Инструкции по восстановлению пароля отправлены на ваш email. Высможете запросить повторные инструкции через 1 минуту.", status: 200}
      else
        Rails.cache.delete("send_reset_password_instructions(#{resource_params[:email]})")
        {errors: resource.errors, msg: resource.errors.full_messages.join(", "), status: 422}
      end
    end

    render json: result, status: result[:status]
  end

  def edit

  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        sign_in(resource_name, resource)
      end
      render json: {msg: "Пароль успешно обновлен"}
    else
      set_minimum_password_length
      render json: {errors: resource.errors, msg: resource.errors.full_messages.join(", ")}, status: 422
    end
  end
end