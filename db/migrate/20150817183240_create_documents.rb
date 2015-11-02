class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :file
      t.integer :user_id
      t.integer :position_id
      t.string :filename

      t.timestamps null: false
    end
  end
end
