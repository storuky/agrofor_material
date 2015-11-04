class WeightDimensionSerializer < ActiveModel::Serializer
  attributes :id, :title, :convert

  def title
    I18n.t("weight_dimension")[object.name.to_sym]
  end
end
