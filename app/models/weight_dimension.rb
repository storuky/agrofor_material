class WeightDimension < ActiveRecord::Base
  include Cacheable

  DIMENSIONS = [
    { id: 1, convert: 1, name: "kg" },
    { id: 2, convert: 1000, name: "tonn" },
    { id: 3, convert: 1, name: "liter"},
    { id: 4, convert: 1000, name: "m3"},
    { id: 5, convert: 28.31, name: "ft3" }
  ]

  class << self
    def normalize weight, weight_dimension_id
      weight.to_f * WeightDimension.serialize.cache.by_index[weight_dimension_id][:convert] rescue -1
    end
  end
end
