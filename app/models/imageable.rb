class Imageable < ActiveRecord::Base
  belongs_to :image
  belongs_to :imageable, polymorphic: true, touch: true
end
