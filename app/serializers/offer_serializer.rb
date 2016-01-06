class OfferSerializer < PositionSerializer
  def status
    {
      id: object.status.to_sym,
      title: I18n.t("offer.status")[object.try(:status).try(:to_sym)]
    }
  end
end
