class CreateKits < ActiveRecord::Migration[5.2]
  def change
    create_table :kits do |t|
      t.string :name
      t.string :description
      t.float :price
      t.integer :quantity_sold

      t.timestamps
    end
  end
end
