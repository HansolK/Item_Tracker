class AddColumnToItem < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :rate, :integer
  end
end
