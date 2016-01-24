class UserInterest < ActiveRecord::Base
  include Companiable
  belongs_to :user
  belongs_to :category
end
