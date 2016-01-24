class CreateDeals < ActiveRecord::Migration
  def change
    create_table :deals do |t|
      t.integer :position_id
      t.index :position_id

      t.integer :offer_id
      t.index :offer_id

      t.integer :correspondence_id
      t.index :correspondence_id

      t.index [:offer_id, :position_id]

      t.string :status, default: "new"
      t.integer :company_id
      t.index :company_id

      t.timestamps null: false
    end
  end
end
