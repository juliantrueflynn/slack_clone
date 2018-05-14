class CreateWorkspaces < ActiveRecord::Migration[5.1]
  def change
    create_table :workspaces do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.string :owner_slug, null: false

      t.timestamps
    end

    add_index :workspaces, :owner_slug
    add_index :workspaces, :slug, unique: true

    add_foreign_key :workspaces, :users, column: :owner_slug, primary_key: :slug
  end
end
