class Template < PositionBase
  before_save :set_template_name
  after_commit :regenerate_cache

  class << self
    def pluck_fields with=[]
      self.pluck(:id, :lat, :lng, :trade_type_id, :option_id, :weight, :weight_dimension_id, :price, :currency_id, :price_weight_dimension_id, :weight_min, :weight_min_dimension_id, :additional, :price_discount, :address, *with)
    end
  end

  private
    def set_template_name
      self.template_name ||= "#{I18n.l DateTime.now, :format => :long} – #{title}"
    end

    def regenerate_cache
      Rails.cache.delete_matched(/User\.templates_from_cache\(#{user_id}\,/)
    end
end
