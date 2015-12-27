class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  serialization_scope :view_context

  after_action :set_csrf_cookie

  layout proc {
    if request.xhr?
      false
    else
      set_gon
      'application'
    end
  }

  def index
    redirect_to map_path
  end

  def serialize res, options = {}
    if res.respond_to?('each')
      serializer = options[:serializer] || "#{res.model_name.name}Serializer".constantize
      ActiveModel::ArraySerializer.new(res, each_serializer: serializer, scope: self, root: false).as_json
    else
      serializer = options[:serializer] || "#{res.model_name.name}Serializer".constantize
      serializer.new(res, scope: self, root: false).as_json
    end
  end

  private
    def set_csrf_cookie
      response.headers['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
    end

    def set_gon
      ActionView::Base.default_form_builder = AgroforFormBuilder

      gon.settings = {
        locale: I18n.locale,
        currency: (current_user.currency rescue Currency.all_by_index_from_cache(serializer: CurrencySerializer)[1])
      }

      gon.data = {
        trade_types: TradeType.all_from_cache(serializer: TradeTypeSerializer),
        weight_dimensions: WeightDimension.all_from_cache(serializer: WeightDimensionSerializer),
        options: Option.all_from_cache(serializer: OptionSerializer),
        categories: Category.all_from_cache(serializer: CategorySerializer),
        currencies: Currency.all_from_cache(serializer: CurrencySerializer),
        statuses: Position.statuses,
        rates: Currency.get_rates(gon.settings[:currency][:name]),
        roles: Role.all_from_cache,
        languages: [{id: "ru", title: "Русский"}, {id: "en", title: "English"}]
      }


      if current_user
        gon.current_user = current_user.info
      end

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
