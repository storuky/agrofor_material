class OfferWithPositionsSerializer < PositionSerializer
  has_many :positions
end
