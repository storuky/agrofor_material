class TradeTypeSerializer < ActiveModel::Serializer
  attributes :id, :title

  def title
    I18n.t "trade_type.#{object.title}"
  end
end
