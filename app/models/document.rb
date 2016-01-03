class Document < ActiveRecord::Base
  before_destroy :remove_file
  
  mount_uploader :file, DocumentUploader
  belongs_to :position_base, touch: true
  belongs_to :user

  has_many :documentable, as: :documentable
  has_many :documents, through: :documentable


  private
    def remove_file
      file.remove!
    end
end
