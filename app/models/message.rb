class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :correspondence, touch: true, :counter_cache => true

  validates :body, presence: true

  has_many :imageable, as: :imageable
  has_many :images, through: :imageable
  
  has_many :documentable, as: :documentable
  has_many :documents, through: :documentable
end
