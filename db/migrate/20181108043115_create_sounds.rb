class CreateSounds < ActiveRecord::Migration[5.2]
  def change
    create_table :sounds do |t|
      t.string :name
      t.string :type
      t.string :description
      t.string :key
      t.float :tempo

      t.timestamps
    end
  end
end
