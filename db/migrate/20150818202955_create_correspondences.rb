class CreateCorrespondences < ActiveRecord::Migration
  def change
    create_table :correspondences do |t|
      t.integer :users_ids, array: true, default: []
      t.index :users_ids, using: 'gin'
      
      t.integer :positions_ids, array: true, default: []
      t.index :positions_ids, using: 'gin'

      t.string :correspondence_type, default: 'users'
      t.index :correspondence_type

      t.string :last_message
      t.integer :messages_count, default: 0

      t.timestamps null: false
    end
  end
end
