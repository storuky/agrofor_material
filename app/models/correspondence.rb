class Correspondence < ActiveRecord::Base
  include Cacheable
  
  has_many :correspondence_positions
  has_many :positions, through: :correspondence_positions, foreign_key: :position_base_id, source: :position

  has_many :correspondence_users
  has_many :users, through: :correspondence_users, source: :user

  has_many :messages

  after_commit :regenerate_cache

  def self.between_users user_ids
    Correspondence.where("users_ids @> ARRAY[?]::integer[]", user_ids).first
  end

  def self.between_positions position_ids
    Correspondence.where("positions_ids @> ARRAY[?]::integer[]", position_ids).first
  end

  private
    def regenerate_cache
      self.users_ids.each do |user_id|
        Rails.cache.delete_matched(/User\.correspondences_from_cache\(#{user_id}\,/)
      end
    end

end
