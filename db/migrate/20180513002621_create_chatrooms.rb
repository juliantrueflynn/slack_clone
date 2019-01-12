class CreateChatrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :chatrooms do |t|
      t.string :title
      t.string :topic
      t.string :slug, null: false
      t.integer :owner_id, default: nil
      t.references :workspace, foreign_key: { on_delete: :cascade }
      t.boolean :has_dm, default: false

      t.timestamps
    end

    add_index :chatrooms, :slug, unique: true
  end
end
