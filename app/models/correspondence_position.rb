class CorrespondencePosition < ActiveRecord::Base
  belongs_to :position_base
  belongs_to :correspondence

  validates :position_base, presence: true
  validates :correspondence, presence: true
end
