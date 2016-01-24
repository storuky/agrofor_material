module Companiable
  extend ActiveSupport::Concern


  included do
    belongs_to :company
    
    default_scope {
      if Company.current_company
        where(company_id: Company.current_company.id)
      end
    }
    
    before_create do
      self.company_id ||= Company.current_company.id
    end
  end

  class_methods do
  end
end