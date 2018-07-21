class CreateReactions < ActiveRecord::Migration[5.1]
  def change
    create_table :reactions do |t|
      t.references :message, index: true, foreign_key: {on_delete: :cascade}
      t.references :user, index: true, foreign_key: {on_delete: :cascade}
      t.string :emoji, null: false

      t.timestamps
    end
  end
end
