class WeightDimension < ActiveRecord::Base

  after_commit :regenerate_cache

  DIMENSIONS = [
    { id: 1, convert: 1, name: "kg" },
    { id: 2, convert: 1000, name: "tonn" },
    { id: 3, convert: 1, name: "liter"},
    { id: 4, convert: 1000, name: "m3"},
    { id: 5, convert: 28.31, name: "ft3" }
  ]

  class << self
    def normalize weight, weight_dimension_id
      weight.to_f * WeightDimension.serialize.cache.index_by[weight_dimension_id][:convert] rescue -1
    end

    def cache
      @cache = true
      self
    end

    def serialize
      @serialize = true
      self
    end

    def all
      return super unless @cache

      @cache = false

      if @serialize
        @serialize = false
        Rails.cache.fetch("WeightDimension.serialize.all.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(WeightDimension.cache.all, each_serializer: WeightDimensionSerializer, root: false).as_json
        end
      else
        Rails.cache.fetch("WeightDimension.all.#{I18n.locale}") do
          WeightDimension.all.load
        end
      end
    end

    def find id
      return super unless @cache
      
      @cache = false
      
      if @serialize
        @serialize = false
        Rails.cache.fetch("WeightDimension.serialize.find(#{id}).#{I18n.locale}") do
          WeightDimensionSerializer.new(WeightDimension.cache.find(id), root: false).as_json
        end
      else
        Rails.cache.fetch("WeightDimension.find(#{id}).#{I18n.locale}") do
          WeightDimension.find(id)
        end
      end
    end

    def index_by
      return super unless @cache

      if @serialize
        @serialize = false
        Rails.cache.fetch("WeightDimension.serialize.index_by.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(WeightDimension.cache.all, each_serializer: WeightDimensionSerializer, root: false).as_json.index_by {|wd| wd[:id]}
        end
      else
        Rails.cache.fetch("WeightDimension.index_by.#{I18n.locale}") do
          WeightDimension.cache.all.index_by(&:id)
        end
      end
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete("WeightDimension.all.#{I18n.locale}")
      Rails.cache.delete("WeightDimension.serialize.all.#{I18n.locale}")
      Rails.cache.delete("WeightDimension.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("WeightDimension.serialize.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("WeightDimension.index_by.#{I18n.locale}")
      Rails.cache.delete("WeightDimension.serialize.index_by.#{I18n.locale}")
    end
    
end
