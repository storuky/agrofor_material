class CreateTradeTypes < ActiveRecord::Migration
  def change
    create_table :trade_types do |t|
      t.string :title
      t.integer :trade_type_id

      t.timestamps null: false
    end
  end
end
