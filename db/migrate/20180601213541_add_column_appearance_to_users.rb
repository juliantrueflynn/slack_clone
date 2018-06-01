class AddColumnAppearanceToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :appearance, :string, null: false
  end
end
