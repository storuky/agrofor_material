class CurrenciesController < ApplicationController
  def currency_rates
    render json: Oj.dump(Currency.get_rates(get_user_currency[:name]))
  end

  def user_currency
    render json: Oj.dump(get_user_currency)
  end
end
