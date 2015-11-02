class Image < ActiveRecord::Base
  before_destroy :remove_file
  
  mount_uploader :file, ImageUploader
  belongs_to :position
  belongs_to :user

  private
    def remove_file
      file.remove!
    end
end
