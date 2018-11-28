class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.references :workspace, foreign_key: {on_delete: :cascade}, index: false
      t.references :message, foreign_key: {on_delete: :cascade}, index: false
      t.references :user, foreign_key: {on_delete: :cascade}, index: false

      t.timestamps
    end

    add_index :favorites, [:workspace_id, :message_id, :user_id], unique: true
  end
end
