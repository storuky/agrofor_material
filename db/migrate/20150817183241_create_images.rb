class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file
      t.integer :user_id
      t.integer :position_base_id
      t.string :filename

      t.timestamps null: false
    end
  end
end
