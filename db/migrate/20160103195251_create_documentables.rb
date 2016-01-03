class CreateDocumentables < ActiveRecord::Migration
  def change
    create_table :documentables do |t|
      t.integer :document_id
      t.integer :documentable_id
      t.string :documentable_type

      t.timestamps null: false
    end
  end
end
