class TradeType < ActiveRecord::Base
  include Cacheable

  TRADETYPES = [{title: "buy", trade_type_id: 2}, {title: "sell", trade_type_id: 1}]

  has_many :positions
  belongs_to :trade_type
end
