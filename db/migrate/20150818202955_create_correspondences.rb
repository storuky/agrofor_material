class CreateCorrespondences < ActiveRecord::Migration
  def change
    create_table :correspondences do |t|
      t.string :type
      t.index :type

      t.integer :messages_count, default: 0

      t.integer :user_ids, array: true, default: []
      t.index :user_ids, using: 'gin'
      
      t.integer :position_ids, array: true, default: []
      t.index :position_ids, using: 'gin'

      t.json :new_messages, default: {}


      t.string :last_message

      t.timestamps null: false
    end
  end
end
