class AgroforMailer < ApplicationMailer
  default from: "Международная аграрная биржа <admin@agrofor.pro>"

  def attract email
    mail(subject: "Приглашаем к сотрудничеству", to: email)
  end
end