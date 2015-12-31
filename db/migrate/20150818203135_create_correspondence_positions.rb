class CreateCorrespondencePositions < ActiveRecord::Migration
  def change
    create_table :correspondence_positions do |t|
      t.integer :position_base_id
      t.integer :correspondence_id
      t.index :position_base_id
      t.index :correspondence_id

      t.timestamps null: false
    end
  end
end
