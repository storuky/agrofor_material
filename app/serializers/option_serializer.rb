class OptionSerializer < ActiveModel::Serializer
  attributes :id, :title, :category
  
  def title
    I18n.t('option.'+object.title)
  end

  def category
    CategorySerializer.new(object.category, root: false)
  end

end
