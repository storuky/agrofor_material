class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :false

  def index
    ActionView::Base.default_form_builder = AgroforFormBuilder

    gon.data = {
      trade_types: Position.trade_types,
      weight_dimensions: WeightDimension.serialize.cache.all,
      options: Option.serialize.cache.all,
      currencies: Currency.serialize.cache.all,
      index_by: {
        currencies: Currency.serialize.cache.index_by,
        weight_dimensions: WeightDimension.serialize.cache.index_by,
        trade_types: Position.trade_types.index_by{|i| i[:id]}
      }
    }

    gon.locale = {
      currency: Currency.serialize.cache.find(1)
    }

    render template: "layouts/application"
  end
end
