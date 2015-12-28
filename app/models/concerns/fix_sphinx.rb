module FixSphinx
  extend ActiveSupport::Concern

  included do |klass|


  end

  class_methods do

    def search_for_ids query = nil, options = {}
      options.merge!({per_page: 1000000})
      super
    end

  end

end