class CreateWorkspaces < ActiveRecord::Migration[5.1]
  def change
    create_table :workspaces do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.integer :owner_id, null: false

      t.timestamps
    end

    add_index :workspaces, :owner_id
    add_index :workspaces, :slug, unique: true
  end
end
