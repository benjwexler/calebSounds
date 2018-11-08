class ChangeColumnNameSound < ActiveRecord::Migration[5.2]
  def change
    rename_column :sounds, :type, :type_of_sound
  end
end
