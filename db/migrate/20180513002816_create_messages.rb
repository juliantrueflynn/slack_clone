class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :author_id, null: false
      t.string :slug, null: false
      t.references :channel, foreign_key: {on_delete: :cascade}
      t.integer :parent_message_id, default: nil
      t.string :entity_type, default: 'entry'

      t.timestamps
    end

    add_index :messages, :slug, unique: true

    add_foreign_key :messages, :users, column: :author_id, on_delete: :cascade
  end
end
