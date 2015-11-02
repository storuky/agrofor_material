class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :false

  def index
    ActionView::Base.default_form_builder = AgroforFormBuilder

    gon.data = {
      trade_types: [{title: "Закупка", id: 1}, {title: "Продажа", id: 2}],
      weight_dimensions: WeightDimension.serialize.cache.all,
      weight_min_dimensions: WeightDimension.serialize.cache.all,
      price_dimensions: WeightDimension.serialize.cache.all,
      options: Option.serialize.cache.all
    }

    render template: "layouts/application"
  end
end
