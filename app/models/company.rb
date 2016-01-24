class Company < ActiveRecord::Base
  @@current_company = nil

  has_many :positions
  has_many :options
  has_many :categories
  has_many :deals
  has_many :offers
  has_many :position_bases
  has_many :correspondences


  class <<self
    def current_company= name
      @@current_company = name
    end

    def current_company
      @@current_company
    end
  end
end
