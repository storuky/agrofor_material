module ApplicationHelper
  def order_positions positions
    if params[:order] == 'price' 
      order = 'position_bases.price_etalon * currencies.to_usd'
    elsif params[:order] == 'price DESC'
      order = 'position_bases.price_etalon * currencies.to_usd DESC'
    else
      if Position.accept_for_order.include?(params[:order])
        order = "position_bases.#{params[:order]}"
      end
    end

    if order
      if current_user
        collection = positions.joins("LEFT JOIN favorite_positions ON (position_bases.id=favorite_positions.position_id AND favorite_positions.user_id=#{current_user.id})").order("favorite_positions.position_id, #{order}")
      else
        collection = positions
      end

      collection.order(order)
    else
      positions
    end
  end

  def set_gon
    ActionView::Base.default_form_builder = AgroforFormBuilder
    
    gon.settings = {
      locale: I18n.locale,
      currency: get_user_currency
    }

    gon.data = get_data

    if current_user
      gon.current_user = current_user.info
      gon.favorite_ids = current_user.favorite_ids
      gon.channel = PrivatePub.subscription(:channel => "/#{current_company.name}/#{current_user.id}").as_json
    end

    gon.translations = get_translations
  end

  def get_translations
    cache_if(Rails.env.production?, "translations_#{current_company.name}_#{I18n.locale}") do
      {
        company: I18n.t("company"),
        dictionary: I18n.t("dictionary"),
        pluralize: I18n.t("pluralize"),
        message: I18n.t("message"),
        interface: I18n.t("interface"),
        activerecord: I18n.t("activerecord.attributes")
      }
    end
  end

  def get_data
    cache_if(Rails.env.production?, "data_#{current_company.name}_#{I18n.locale}") do
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
    serialize(current_user.currency || Currency.first)
  end

  def extract_locale_from_accept_language_header
    if request.env['HTTP_ACCEPT_LANGUAGE']
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    else
      :en
    end
  end
end
