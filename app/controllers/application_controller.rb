class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout proc {
    if request.xhr?
      false
    else
      set_gon
      'application'
    end
  }

  def index
    redirect_to search_path
  end

  private
    def set_gon
      ActionView::Base.default_form_builder = AgroforFormBuilder

      gon.data = {
        trade_types: TradeType.serialize.cache.all,
        weight_dimensions: WeightDimension.serialize.cache.all,
        options: Option.serialize.cache.all,
        currencies: Currency.serialize.cache.all,
        statuses: Position.statuses,
        by_index: {
          currencies: Currency.serialize.cache.by_index,
          weight_dimensions: WeightDimension.serialize.cache.by_index,
          trade_types: TradeType.serialize.cache.by_index
        }
      }


      if current_user
        gon.current_user = current_user.info
      end

      gon.settings = {
        locale: I18n.locale,
        currency: (gon.current_user.currency rescue Currency.serialize.cache.by_index[1])
      }
    end

    def check_user
      respond_to do |format|
        format.html
        format.json {
          unless current_user
            render json: {msg: "Вы не авторизованы"}, status: 401
          end
        }
      end
    end
end
