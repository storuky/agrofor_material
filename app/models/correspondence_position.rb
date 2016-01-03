class CorrespondencePosition < ActiveRecord::Base
  belongs_to :position, foreign_key: :position_base_id
  belongs_to :correspondence

  validates :position_base, presence: true
  validates :correspondence, presence: true
end
