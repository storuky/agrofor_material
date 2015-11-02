class Category < ActiveRecord::Base
  after_commit :regenerate_cache

  has_many :options

  CATEGORY = [ "berries",
      "bobs",
      "corn",
      "dairy",
      "dried fruit",
      "eggs",
      "fish",
      "fruits",
      "herbs",
      "mushrooms",
      "feed for animals",
      "oilseeds",
      "meat",
      "honey",
      "flour",
      "nuts",
      "vegetable oil",
      "seafood",
      "seed ang seedlings",
      "sugar",
      "vegetables",
      "wheat",
      "wood",
      "fertilizers and chemicals"]


  def self.all_from_cache
    Rails.cache.fetch("categories_all_#{I18n.locale}") do
      categories = ActiveModel::ArraySerializer.new(Category.includes(:options), each_serializer: CategoryWithOptionsSerializer)
    end
  end


  private
    def regenerate_cache
      Rails.cache.delete("categories_all_#{I18n.locale}")
    end
end
