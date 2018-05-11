class AddIndexToChannels < ActiveRecord::Migration[5.1]
  def change
    add_column :channels, :slug, :string, null: false
    add_index :channels, :slug, unique: true
  end
end
