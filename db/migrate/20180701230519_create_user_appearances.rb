class CreateUserAppearances < ActiveRecord::Migration[5.1]
  def change
    create_table :user_appearances do |t|
      t.string :status, null: false, default: 'ONLINE'
      t.references :user, foreign_key: true, index: false, null: false
      t.string :workspace_slug, null: false

      t.timestamps
    end

    add_index :user_appearances, [:workspace_slug, :user_id], unique: true
  end
end
