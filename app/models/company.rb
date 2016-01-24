class Company < ActiveRecord::Base
  @@current_company = nil

  class <<self
    def current_company= name
      @@current_company = name
    end

    def current_company
      @@current_company
    end
  end
end
