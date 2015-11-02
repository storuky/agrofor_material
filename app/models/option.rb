class Option < ActiveRecord::Base
  after_save :regenerate_cache

  belongs_to :category
  has_many :position

  OPTIONS = {
    "berries" => ["watermelon", "barberry", "cowberry", "elder", "grapes", "goji berries", "blueberry", "cherry", "melon", "blackberries", "strawberry", "shadberry", "viburnum", "dogwood", "strawberry", "cranberry", "redcurrant", "gooseberry", "lemongrass", "raspberry", "cloudberry", "sea buckthorn", "green olives", "rowan", "blackthorn", "feijoa ", "physalis", "cherry", "blackberry", "blueberry", "bird-cherry tree", "chokeberry", "mulberry", "briar"], 
    "bobs" => ["mung beans", "vetch", "peas", "lupine", "chick-pea", "soy", "beans", "lentil", "chin"],
    "corn" => ["corn sugar", "waxy maize", "corn filmy", "corn burst", "dent corn", "starchy corn", "corn siliceous"],
    "dairy" => ["milk", "cheese", "feta cheese", "butter", "cream", "sour cream", "cottage cheese"],
    "dried fruit" => ["raisins", "fig", "dried apricots", "date", "prune"],
    "eggs" => ["goose eggs", "turkey eggs", "chicken eggs", "quail eggs", "ostrich eggs", "duck eggs"],
    "fish" => ["anchovies", "red mullet (sultan)", "chub", "pink salmon", "dorado", "ruff", "lancet fish", "flounder", "crucian", "carp", "dog-salmon", "mullet", "smelt", "tench", "bream", "bluefish", "mackerel", "pollack", "capelin", "sea bass", "burbot", "perch", "sturgeon", "halibut", "haddock", "roach", "carp", "sprat", "sardine", "herring", "salmon", "whitefish", "mackerel", "catfish", "horse mackerel", "sterlet", "zander", "carp", "cod", "tuna", "trout", "hake", "pike", "ide"],
    "fruits" => ["apricot", "avocado", "quince", "cherry-plum", "pineapple", "annona (guanabana)", "orange", "banana", "garnet", "grapefruit", "pear", "guava", "jackfruit", "draconian fruit (pitahaya)", "durian", "carambola", "kiwi", "clementines", "kumquat", "lime", "lemon", "lichee", "mango", "mangosteen", "tangerine", "passionfruit", "medlar", "nectarine", "papaya", "peach", "witch's broom", "rambutan", "sweetie", "plum", "persimmon", "apple"],
    "herbs" => ["artichoke", "asparagus", "basil", "parsley", "lettuce", "celery", "dill", "chicory", "wild leek", "spinach", "sorrel"],
    "mushrooms" => ["cep (boletus)", "oyster mushrooms", "milk mushroom", "ivishen (clitopilus prunulus)", "chanterelles", "boletus", "flywheel", "mushrooms", "boletus", "orange-cap boletus", "saffron milk cap", "morels", "russule", "truffle", "champignon", "shiitake"],
    "feed for animals" => ["vitamins", "cake", "pulp", "wms", "ingredients", "fodder", "feed additives", "meat meal", "meat and bone meal", "bran", "premixes", "fishmeal", "silage", "soy", "schroth"],
    "oilseeds" => ["mustard", "coriander", "sesame", "flax", "sunflower", "rape", "cumin"],
    "meat" => ["lamb", "bacon", "cold boiled pork", "ham", "beef ", "hare", "goat meat", "horsemeat", "rabbit", "venison", "liver", "fat", "pork", "veal", "meat language"],
    "honey" => ["linden honey", "acacia honey", "sunflower honey", "buckwheat honey", "raspberry honey", "barberry honey", "cornflower honey", "heather honey", "honey mustard", "blackberry honey", "pumpkin honey", "melissovy honey", "clover honey", "mint honey", "dandelion honey", "ryabinovny honey", "blueberry honey", "sage honey", "carrot honey", "may honey", "meadow honey", "forest honey", "field honey", "mountain honey", "tobacco honey", "stone honey", "powdered honey", "comb"],
    "flour" => ["wheat top grade flour", "wheat first grade flour", "wheat second grade flour", "flaxseed oil", "olive oil"],
    "nuts" => ["peanuts", "brazil nuts ", "walnut", "chestnut", "pine nuts", "cashew", "coconut", "almonds", "nutmeg", "pistachios", "hazelnut"],
    "vegetable oil" => ["sunflower oil", "peanut oil", "mustard oil", "sesame oil ", "corn oil", "rapeseed oil", "soybean oil"],
    "seafood" => ["algae", "squid", "crab", "shrimp", "crayfish", "scampi", "lobster", "mussel", "laminaria", "scallops", "octopus", "trepang", "oyster"],
    "seed ang seedlings" => ["seed", "seedlings"],
    "sugar" => ["sugar", "cane sugar", "lump sugar", "candy sugar"],
    "vegetables" => ["arrowroot", "eggplant", "rutabaga", "buryak", "squash ", "capers", "white cabbage", "broccoli", "brussels sprouts", "cabbage", "cabbage", "cauliflower", "potato", "corn", "onions", "leek", "shallot", "carrot", "cucumber", "parsnip", "squash", "sweet pepper", "tomato", "cherry tomatoes", "radishes", "radish", "turnip", "beet", "pumpkin", "horseradish", "zucchini", "garlic"],
    "wheat" => ["buckwheat", "wheat", "rice", "rye", "barley"],
    "wood" => ["firewood", "sawdust"],
    "fertilizers and chemicals" => ["biofertilizers", "herbicides", "primers", "pesticides", "plant protection products", "fertilizers"]
  }

  class << self
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
        Rails.cache.fetch("Option.serialize.all.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(Option.cache.all, each_serializer: OptionSerializer, root: false).as_json
        end
      else
        Rails.cache.fetch("Option.all.#{I18n.locale}") do
          Option.all.load
        end
      end
    end

    def find id
      return super unless @cache
      
      @cache = false
      
      if @serialize
        @serialize = false
        Rails.cache.fetch("Option.serialize.find(#{id}).#{I18n.locale}") do
          OptionSerializer.new(Option.cache.find(id), root: false).as_json
        end
      else
        Rails.cache.fetch("Option.find(#{id}).#{I18n.locale}") do
          Option.find(id)
        end
      end
    end

    def index_by
      return super unless @cache

      if @serialize
        @serialize = false
        Rails.cache.fetch("Option.serialize.index_by.#{I18n.locale}") do
          ActiveModel::ArraySerializer.new(Option.cache.all, each_serializer: OptionSerializer, root: false).as_json.index_by {|wd| wd[:id]}
        end
      else
        Rails.cache.fetch("Option.index_by.#{I18n.locale}") do
          Option.cache.all.index_by(&:id)
        end
      end
    end
  end

  private
    def regenerate_cache
      Rails.cache.delete("Option.all.#{I18n.locale}")
      Rails.cache.delete("Option.serialize.all.#{I18n.locale}")
      Rails.cache.delete("Option.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("Option.serialize.find(#{self.id}).#{I18n.locale}")
      Rails.cache.delete("Option.index_by.#{I18n.locale}")
      Rails.cache.delete("Option.serialize.index_by.#{I18n.locale}")
    end
end
