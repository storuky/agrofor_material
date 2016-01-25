# Preview all emails at http://localhost:3000/rails/mailers/test_mailer
class AgroforMailerPreview < ActionMailer::Preview
  def attract
    AgroforMailer.attract("storuky@gmail.com")
  end
end
