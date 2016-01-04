class Correspondence < ActiveRecord::Base
  include Cacheable

  has_many :messages

  before_create :set_new_messages

  class << self
    def between_users user_ids
      Correspondence.where("user_ids @> ARRAY[?]::integer[]", user_ids).first
    end

    def between_positions position_ids
      Correspondence.where("position_ids @> ARRAY[?]::integer[]", position_ids).first
    end
  end

  def users
    User.find_from_cache(user_ids)
  end

  def positions
    PositionBase.find_from_cache(position_ids)
  end

  def mark_as_read user_id
    self.new_messages[user_id.to_s] = []
    self.save
  end

  private
    def set_new_messages
      self.user_ids.each do |user_id|
        self.new_messages[user_id.to_s] = []
      end
    end
end
