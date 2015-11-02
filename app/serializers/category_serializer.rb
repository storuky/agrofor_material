class CategorySerializer < ActiveModel::Serializer
  attributes :id, :title

  def title
    I18n.t('category.'+object.title)
  end

end
