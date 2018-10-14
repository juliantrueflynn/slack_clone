class CreateUserAppearances < ActiveRecord::Migration[5.1]
  def change
    create_table :user_appearances do |t|
      t.string :status, null: false, default: 'online'
      t.references :user, foreign_key: {on_delete: :cascade}, index: false
      t.references :workspace, foreign_key: {on_delete: :cascade}, index: false

      t.timestamps
    end

    add_index :user_appearances, [:workspace_id, :user_id], unique: true
  end
end
