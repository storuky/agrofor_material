# Preview all emails at http://localhost:3000/rails/mailers/account_mailer
class AccountMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    AccountMailer.confirmation_instructions(User.last, "")
  end

  def reset_password_instructions
    AccountMailer.reset_password_instructions(User.last, "")
  end

  def password_change
    AccountMailer.password_change(User.last)
  end
end
