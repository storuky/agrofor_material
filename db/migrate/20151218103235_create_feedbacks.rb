class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.integer :author_id
      t.integer :user_id
      t.integer :position_base_id
      t.text :description
      t.boolean :positive, default: true
      
      t.integer :company_id
      t.index :company_id

      t.timestamps null: false
    end
  end
end
