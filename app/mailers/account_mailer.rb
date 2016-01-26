class AccountMailer < Devise::Mailer
  helper :application
  
  before_action :set_company

  include Devise::Controllers::UrlHelpers
  include Devise::Mailers::Helpers
  default template_path: 'devise/mailer'
  
  helper_method :current_company

  # def confirmation_instructions(record, token, opts={})
  #   super
  # end

  # def reset_password_instructions(record, token, opts={})
  #   super
  # end

  # def password_change(record, opts={})
  #   super
  # end

  def set_company
    Company.current_company = OpenStruct.new Rails.application.secrets[:companies][ActionMailer::Base.default_url_options[:host]]
  end
end
