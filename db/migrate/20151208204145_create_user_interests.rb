class CreateUserInterests < ActiveRecord::Migration
  def change
    create_table :user_interests do |t|
      t.integer :user_id
      t.integer :category_id

      t.integer :company_id
      t.index :company_id

      t.timestamps null: false
    end
  end
end
