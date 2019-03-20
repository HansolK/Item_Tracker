class EditItemColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :items, :price, :decimal, precision: 5, scale: 2
  end
end
