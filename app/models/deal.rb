class Deal < ActiveRecord::Base
  include Companiable
  include AASM
  
  belongs_to :position
  belongs_to :offer
  belongs_to :correspondence

  aasm :column => :status do
    state :new, :initial => true
    state :shipping
    state :receiving
    state :completed

    event :ship do
      transitions :to => :shipping, from: :new
    end

    event :receive do
      transitions :to => :receiving, from: :shipping
    end

    event :complete do
      transitions :to => :completed, from: :receiving
    end
  end

end
