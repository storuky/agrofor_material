class Template < PositionBase
  before_save :set_template_name

  private
    def set_template_name
      self.template_name ||= "#{I18n.l DateTime.now, :format => :long} – #{title}"
    end

end
