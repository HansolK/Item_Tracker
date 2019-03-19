class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :category_id
      t.text :name
      t.text :description
      t.decimal :price, precision: 5, scale: 2

      t.timestamps
    end
  end
end
