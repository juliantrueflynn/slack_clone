class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :title, null: false
      t.text :topic
      t.string :slug, null: false
      t.string :owner_slug, null: false
      t.string :workspace_slug, null: false

      t.timestamps
    end

    add_index :channels, :owner_slug
    add_index :channels, :slug, unique: true

    add_foreign_key :channels, :users, column: :owner_slug, primary_key: :slug
    add_foreign_key :channels, :workspaces, column: :workspace_slug, primary_key: :slug
  end
end
