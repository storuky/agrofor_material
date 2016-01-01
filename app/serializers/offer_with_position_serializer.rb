class OfferWithPositionSerializer < PositionSerializer
  attributes :offers

  def offers
    [PositionSerializer.new(object.position)]
  end
end
