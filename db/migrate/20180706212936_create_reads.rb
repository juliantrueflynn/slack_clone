class CreateReads < ActiveRecord::Migration[5.1]
  def change
    create_table :reads do |t|
      t.integer :readable_id, null: false
      t.string :readable_type, null: false
      t.references :user, foreign_key: {on_delete: :cascade}, index: false
      t.references :workspace, foreign_key: {on_delete: :cascade}, index: false
      t.datetime :accessed_at, null: false

      t.timestamp :created_at
    end

    add_index :reads, [:readable_type, :readable_id, :workspace_id, :user_id], name: 'index_read_workspace_user'
  end
end
