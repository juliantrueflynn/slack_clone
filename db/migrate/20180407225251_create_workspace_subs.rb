class CreateWorkspaceSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :workspace_subs do |t|
      t.integer :user_id, null: false
      t.integer :workspace_id, null: false

      t.timestamps
    end

    add_index :workspace_subs, [:workspace_id, :user_id], unique: true    

    add_foreign_key :workspace_subs, :users
    add_foreign_key :workspace_subs, :workspaces
  end
end
