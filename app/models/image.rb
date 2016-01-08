class Image < ActiveRecord::Base
  before_destroy :remove_file
  
  mount_uploader :file, ImageUploader
  belongs_to :user

  validates :file, file_size: { less_than: 2.megabytes }

  has_many :imageable, as: :imageable
  has_many :images, through: :imageable

  private
    def remove_file
      file.remove!
    end
end
