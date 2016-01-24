class CreateFavoritePositions < ActiveRecord::Migration
  def change
    create_table :favorite_positions do |t|
      t.integer :user_id
      t.integer :position_id

      t.integer :company_id
      t.index :company_id

      t.timestamps null: false
    end
  end
end
