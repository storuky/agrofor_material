class AgroforMailer < ApplicationMailer
  before_action :set_company

  def attract email
    mail(subject: "Приглашаем к сотрудничеству", to: email)
  end

  def set_company
    Company.current_company = OpenStruct.new Rails.application.secrets[:companies][ActionMailer::Base.default_url_options[:host]]
    ActionMailer::Base.default :from => I18n.t("mailer.#{Company.current_company.name}.from")
  end
end