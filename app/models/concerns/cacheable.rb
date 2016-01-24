module Cacheable
  extend ActiveSupport::Concern

  included do
    after_commit :clear_cache
    
    private
      def clear_cache
        Rails.cache.delete_matched(/#{self.class.to_s}\.cache\.all/)
        Rails.cache.delete_matched(/#{self.class.to_s}\.cache\.find\(#{self.id}\)/)
      end
  end

  class_methods do

    def cache_name name, options
      "#{self.to_s}.cache.#{name}(locale: #{I18n.locale}, serializer: #{options[:serializer]}, company_id: #{Company.current_company.id})"
    end

    def all_from_cache options = {}
      cache_name = self.cache_name :all, options

      Rails.cache.fetch(cache_name) do
        if options[:serializer]
          ActiveModel::ArraySerializer.new(self.all_from_cache, each_serializer: options[:serializer], root: false).as_json
        else
          self.all.load
        end
      end
    end

    def delete_all_from_cache
      Rails.cache.delete_matched(/#{self.to_s}\.cache\.all/)
    end

    def find_from_cache id, options = {}
      cache_name = self.cache_name "find(#{id})", options
      Rails.cache.fetch(cache_name) do
        if options[:serializer]
          if id.respond_to?('each')
            ActiveModel::ArraySerializer.new(self.find_from_cache(id), each_serializer: options[:serializer], root: false).as_json
          else
            options[:serializer].new(self.find_from_cache(id), root: false).as_json
          end
        else
          self.find(id)
        end
      end
    end

    def delete_find_from_cache id
      Rails.cache.delete_matched(/#{self.to_s}\.cache\.find\(#{id}\)/)
    end

    def all_by_index_from_cache options = {}
      cache_name = self.cache_name "all_by_index", options
      Rails.cache.fetch(cache_name) do
        if options[:serializer]
          ActiveModel::ArraySerializer.new(self.all_from_cache, each_serializer: options[:serializer], root: false).as_json.index_by {|el| el[:id]}
        else
          self.all.index_by(&:id)
        end.with_indifferent_access
      end
    end

    def delete_all_by_index_from_cache options = {}
      Rails.cache.delete_matched(/#{self.to_s}\.cache\.all_by_index/)
    end
  end
end