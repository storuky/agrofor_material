module MailersPatch
  extend ActiveSupport::Concern
  included do |klass|
    include ApplicationHelper
    before_action :set_company
  end

  module ClassMethods

  end
end

Rails::MailersController.send :include, MailersPatch
