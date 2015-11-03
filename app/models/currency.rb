class Currency < ActiveRecord::Base
  after_commit :regenerate_cache

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

  @@redis = Redis.new(:host => "127.0.0.1", :port => "6379", :driver => :hiredis, :db => 2)

  def redis
    @@redis
  end

  def self.get_rates name
    rates = Currency.cache.all.map do |currency|
      {id: currency.id, rate: currency.get_rate(name)}
    end
    rates.index_by{|rate| rate[:id]}
  end

  def get_rate name
    if self.name == name
      1
    else
      symbol = self.name + name
      if @@redis.exists(symbol)
        @@redis.get(symbol).to_f
      else
        bank = Money::Bank::GoogleCurrency.new
        rate = bank.get_rate(self.name, name).to_f
        @@redis.set(symbol, rate, ex: 60*60)
        @@redis.set(name+self.name, 1.0/rate, ex: 60*60)
        rate
      end
    end
  end

  class << self
    def normalize weight, weight_dimension_id
      weight.to_f * Currency.serialize.cache.index_by[weight_dimension_id][:convert] rescue -1
    end

    def cache
      @cache = true
      self
    end

    def serialize
      @serialize = true
      self
    end

    def all
      return super unless @cache

      @cache = false

      if @serialize
        @serialize = false
        Rails.cache.fetch("Currency.serialize.all.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(Currency.cache.all, each_serializer: CurrencySerializer, root: false).as_json
        end
      else
        Rails.cache.fetch("Currency.all.#{I18n.locale}") do
          Currency.all.load
        end
      end
    end

    def find id
      return super unless @cache
      
      @cache = false
      
      if @serialize
        @serialize = false
        Rails.cache.fetch("Currency.serialize.find(#{id}).#{I18n.locale}") do
          CurrencySerializer.new(Currency.cache.find(id), root: false).as_json
        end
      else
        Rails.cache.fetch("Currency.find(#{id}).#{I18n.locale}") do
          Currency.find(id)
        end
      end
    end

    def index_by
      return super unless @cache

      if @serialize
        @serialize = false
        Rails.cache.fetch("Currency.serialize.index_by.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(Currency.cache.all, each_serializer: CurrencySerializer, root: false).as_json.index_by {|wd| wd[:id]}
        end
      else
        Rails.cache.fetch("Currency.index_by.#{I18n.locale}") do
          Currency.cache.all.index_by(&:id)
        end
      end
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete("Currency.all.#{I18n.locale}")
      Rails.cache.delete("Currency.serialize.all.#{I18n.locale}")
      Rails.cache.delete("Currency.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("Currency.serialize.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("Currency.index_by.#{I18n.locale}")
      Rails.cache.delete("Currency.serialize.index_by.#{I18n.locale}")
    end
end
