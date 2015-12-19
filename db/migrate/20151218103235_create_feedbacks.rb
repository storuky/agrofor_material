class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.integer :author_id
      t.integer :user_id
      t.integer :position_id
      t.text :description
      t.boolean :positive, default: true

      t.timestamps null: false
    end
  end
end
