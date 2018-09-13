class CreateUnreads < ActiveRecord::Migration[5.1]
  def change
    create_table :unreads do |t|
      t.integer :unreadable_id, null: false
      t.string :unreadable_type, null: false
      t.references :workspace, foreign_key: {on_delete: :cascade}, index: false
      t.datetime :active_at, null: false

      t.timestamps
    end

    add_index :unreads, [:unreadable_type, :unreadable_id, :workspace_id], name: 'index_unread_workspace_user'
  end
end
