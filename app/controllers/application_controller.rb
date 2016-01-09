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

  def counters
    render json: {
      new_messages_count: (current_user.new_messages_count rescue 0),
      new_offers_count: (current_user.new_offers_count rescue 0),
    }
  end

  def translations
    currency = get_user_currency
    result = {
      translations: get_translations,
      data: get_data.merge!(rates: Currency.get_rates(currency[:name])),
      locale: I18n.locale
    }
    render json: Oj.dump(result)
  end

  def user_currency
    render json: Oj.dump(get_user_currency)
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

  def cache_if(condition, name = {}, options = nil, &block)
    if condition
      Rails.cache.fetch(name, options, &block)
    else
      yield
    end
  end

  private

    def set_csrf_cookie
      response.headers['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
    end

    def set_gon
      ActionView::Base.default_form_builder = AgroforFormBuilder
      
      currency = get_user_currency
      
      gon.settings = {
        locale: I18n.locale,
        currency: currency
      }

      gon.data = get_data.merge!(rates: Currency.get_rates(currency[:name]))

      if current_user
        gon.current_user = current_user.info
        gon.favorite_ids = current_user.favorite_ids
        gon.channel = PrivatePub.subscription(:channel => "/stream/#{current_user.id}").as_json
      end

      gon.translations = get_translations
    end

    def get_translations
      I18n.locale = current_user.language || "en" rescue "en"
      cache_if(Rails.env.production?, "translations_#{I18n.locale}") do
        {
          dictionary: I18n.t("dictionary"),
          message: I18n.t("message"),
          interface: I18n.t("interface"),
          activerecord: I18n.t("activerecord.attributes")
        }
      end
    end

    def get_data
      cache_if(Rails.env.production?, "data_#{I18n.locale}") do
        {
          trade_types: TradeType.all_from_cache(serializer: TradeTypeSerializer),
          weight_dimensions: WeightDimension.all_from_cache(serializer: WeightDimensionSerializer),
          options: Option.all_from_cache(serializer: OptionSerializer),
          categories: Category.all_from_cache(serializer: CategorySerializer),
          currencies: Currency.all_from_cache(serializer: CurrencySerializer),
          statuses: Position.statuses,
          offers_statuses: Offer.statuses,
          roles: Role.all_from_cache,
          languages: [{id: "ru", title: "Русский"}, {id: "en", title: "English"}]
        }
      end
    end

    def get_user_currency
      (serialize(current_user.currency) rescue Currency.all_by_index_from_cache(serializer: CurrencySerializer)[1])
    end

    def check_user
      unless current_user
        respond_to do |format|
          format.html
          format.json {
              render json: {msg: "Вы не авторизованы"}, status: 401
          }
        end
      end
    end
end
