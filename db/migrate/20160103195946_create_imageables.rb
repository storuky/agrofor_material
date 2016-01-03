class CreateImageables < ActiveRecord::Migration
  def change
    create_table :imageables do |t|
      t.integer :image_id
      t.integer :imageable_id
      t.string :imageable_type

      t.timestamps null: false
    end
  end
end
