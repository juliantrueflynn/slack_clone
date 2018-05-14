class CreateWorkspaceSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :workspace_subs do |t|
      t.string :user_slug, null: false
      t.string :workspace_slug, null: false

      t.timestamps
    end

    add_index :workspace_subs, [:workspace_slug, :user_slug], unique: true    

    add_foreign_key :workspace_subs, :users, column: :user_slug, primary_key: :slug
    add_foreign_key :workspace_subs, :workspaces, column: :workspace_slug, primary_key: :slug
  end
end
