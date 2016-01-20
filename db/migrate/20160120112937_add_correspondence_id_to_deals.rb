class AddCorrespondenceIdToDeals < ActiveRecord::Migration
  def change
    add_column :deals, :correspondence_id, :integer
  end
end
