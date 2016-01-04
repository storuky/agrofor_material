class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :correspondence_id
      t.index :correspondence_id
      t.text :body
      t.integer :user_id
      t.index :user_id
      t.string :message_type
      t.boolean :readed, default: false

      t.timestamps null: false
    end
  end
end
