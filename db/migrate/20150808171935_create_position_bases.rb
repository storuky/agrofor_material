class CreatePositionBases < ActiveRecord::Migration
  def change
    create_table :position_bases do |t|
      t.string :type

      t.string :template_name

      t.boolean :delta, :default => true, :null => false
      t.string :status

      t.integer :position_id
      t.index :position_id

      t.integer :from_position_id
      t.index :from_position_id

      t.integer :offer_id
      t.index :offer_id
      
      t.string :title
      t.text :description

      t.integer :user_id
      t.index :user_id

      t.integer :option_id
      t.index :option_id

      t.integer :category_id, default: 1
      t.index :category_id

      t.integer :trade_type_id, default: 1
      t.index :trade_type_id

      t.integer :currency_id

      t.float :price
      t.index :price
      
      t.float :price_etalon
      t.index :price_etalon
      t.float :price_discount, :default => 5, :null => false
      t.integer :price_weight_dimension_id, default: 1

      t.float :weight
      t.float :weight_min, :default => 0, :null => false

      t.float :weight_etalon
      t.index :weight_etalon

      t.float :weight_min_etalon, :default => 0, :null => false
      t.index :weight_min_etalon

      t.integer :weight_dimension_id, default: 1
      t.index :weight_dimension_id

      t.integer :weight_min_dimension_id, default: 1
      t.index :weight_min_dimension_id

      t.text :index_field

      t.string :city
      t.index :city
      
      t.string :address

      t.float :lat
      t.index :lat
      
      t.float :lng
      t.index :lng

      t.integer :deal_with_id
      t.index :deal_with_id
      
      t.integer :company_id
      t.index :company_id
      
      t.timestamps null: false
    end
  end
end
