module Cacheable
  extend ActiveSupport::Concern

  included do
    after_commit :clear_cache
    
    private
      def clear_cache
        self.class.cache.clear.all
        self.class.cache.clear.find(id)
        self.class.cache.clear.by_index
        self.class.cache.clear.serialize.all
        self.class.cache.clear.serialize.find(id)
        self.class.cache.clear.serialize.by_index
      end
  end

  class_methods do
    def cache
      @cache = true
      self
    end

    def serialize
      @serialize = true
      self
    end

    def clear
      @clear = true
      self
    end

    def all
      return super unless @cache
      serialize, cache, clear = @serialize, @cache, @clear
      @serialize = @cache = @clear = false

      cache_name = "#{self.to_s}.all.#{I18n.locale}"
      cache_name += ".serialize" if serialize

      return Rails.cache.delete(cache_name) if clear

      Rails.cache.fetch(cache_name) do
        if serialize
          ActiveModel::ArraySerializer.new(self.cache.all, each_serializer: "#{self.to_s}Serializer".constantize, root: false).as_json
        else
          self.all.load
        end
      end
    end

    def find id
      return super unless @cache
      serialize, cache, clear = @serialize, @cache, @clear
      @serialize = @cache = @clear = false

      cache_name = "#{self.to_s}.find(#{id}).#{I18n.locale}"
      cache_name += ".serialize" if serialize

      return Rails.cache.delete(cache_name) if clear

      Rails.cache.fetch(cache_name) do
        if serialize
          "#{self.to_s}Serializer".constantize.new(self.cache.find(id), root: false).as_json
        else
          self.find(id)
        end
      end
    end

    def by_index
      return super unless @cache
      serialize, cache, clear = @serialize, @cache, @clear
      @serialize = @cache = @clear = false

      cache_name = "#{self.to_s}.by_index.#{I18n.locale}"
      cache_name += ".serialize" if serialize

      return Rails.cache.delete(cache_name) if clear

      Rails.cache.fetch(cache_name) do
        if serialize
          ActiveModel::ArraySerializer.new(self.cache.all, each_serializer: "#{self.to_s}Serializer".constantize, root: false).as_json.index_by {|el| el[:id]}
        else
          self.cache.all.index_by(&:id)
        end
      end
    end
  end
end