class Currency < ActiveRecord::Base
  include Cacheable

  require 'money'
  require 'money/bank/google_currency'

  CURRENCY = [
    {
      name: "RUB", title: "руб"
    },
    {
      name: "USD", title: "$"
    },
    {
      name: "EUR", title: "€"
    },
    {
      name: "GBP", title: "£"
    },
    {
      name: "JPY", title: "¥"
    },
    {
      name: "CAD", title: "CAD"
    },
    {
      name: "CNY", title: "CNY"
    },
    {
      name: "AUD", title: "AUD"
    },
    {
      name: "NZD", title: "NZD"
    },
  ]

  class << self
    def get_rates name
      Rails.cache.fetch("Currency.get_rates(#{name})", expires_in: 1.hours) do
        rates = Currency.all_from_cache.map do |currency|
          {id: currency.id, rate: currency.get_rate(name)}
        end
        rates.index_by{|rate| rate[:id]}
      end
    end

    def normalize weight, weight_dimension_id
      weight.to_f * Currency.all_by_index_from_cache(serializer: CurrencySerializer)[weight_dimension_id][:convert] rescue -1
    end
  end

  def get_rate name
    Rails.cache.fetch("Currency.get_rate(#{self.name}/#{name})", expires_in: 1.hours) do
      if self.name == name
        1
      else
        symbol = self.name + name
        bank = Money::Bank::GoogleCurrency.new
        bank.get_rate(self.name, name).to_f
      end
    end
  end

end
