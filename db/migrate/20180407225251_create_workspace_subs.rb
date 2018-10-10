class CreateWorkspaceSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :workspace_subs do |t|
      t.references :user, foreign_key: {on_delete: :cascade}, index: false
      t.references :workspace, foreign_key: {on_delete: :cascade}, index: false
      t.boolean :is_member, default: true

      t.timestamps
    end

    add_index :workspace_subs, [:workspace_id, :user_id], unique: true
  end
end
