class Template < PositionBase
  before_save :set_template_name
  after_commit :regenerate_cache

  private
    def set_template_name
      self.template_name ||= "#{I18n.l DateTime.now, :format => :long} – #{title}"
    end

    def regenerate_cache
      Rails.cache.delete_matched(/User\.templates_from_cache\(#{user_id}\,/)
    end
end
