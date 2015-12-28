class FavoritePosition < ActiveRecord::Base
  after_commit :regenerate_cache

  belongs_to :user
  belongs_to :position

  private
    def regenerate_cache
      Rails.cache.delete("User.favorite_ids(#{user_id})")
    end
end
