class AddIndexToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :slug, :string, null: false
    add_index :messages, :slug, unique: true
  end
end
