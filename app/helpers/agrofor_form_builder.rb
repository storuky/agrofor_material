class AgroforFormBuilder < OxymoronFormBuilder
  include ActionView::Helpers::TagHelper
  include ActionView::Context

  def check_box method, options = {}
    options = options.merge({
      "aria-label" => options["aria-label"] || @object.class.human_attribute_name(method),
      "ng-model" => ng_model("#{method}")
    })

    @template.content_tag "md-checkbox", options do 
      @object.class.human_attribute_name(method)
    end
  end

  def select method, options = {}
    singular = method.to_s.singularize
    plural = method.to_s.pluralize
    collection = options[:collection] || "gon.data.#{plural}"

    if options[:init]
      options["ng-init"] = ng_model("#{method}_id") + " = #{collection}[0].id"
    end

    options = options.merge({
      "ng-model" => options["ng-model"] || ng_model("#{method}_id"),
      "aria-label" => "#{singular}.title || 'aria'"
    })

    template = @template.content_tag :label, @object.class.human_attribute_name(method), options
    template += @template.content_tag "md-select", options do
      @template.content_tag "md-option", {"ng-repeat" => "#{singular} in #{collection}", value: "{{#{singular}.id}}"} do
        "#{options[:prefix]}{{#{singular}.title}}"
      end
    end
  end

  def text_field method, options = {}
    template = @template.content_tag :label, @object.class.human_attribute_name(method), {}
    template += super(method, options)
  end

  def text_area method, options = {}
    template = @template.content_tag :label, @object.class.human_attribute_name(method), {col: 1, "ng-model" => options["ng-model"] || ng_model("#{method}")}
    template += super(method, options)
  end

end