class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :correspondence, counter_cache: true

  validates :body, presence: true

  has_many :imageable, as: :imageable
  has_many :images, through: :imageable
  
  has_many :documentable, as: :documentable
  has_many :documents, through: :documentable

  after_create :update_correspondence_and_send_ws

  private
    def update_correspondence_and_send_ws
      new_messages = correspondence.new_messages
      opponent_id = new_messages.keys.find{|key| key != user_id.to_s}
      new_messages[opponent_id] << self.id
      correspondence.update(last_message: self.body, new_messages: new_messages)

      PrivatePub.publish_to "/stream/#{opponent_id}", MessageSerializer.new(self, root: false).as_json
    end

end
