class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :parent_message_id, default: nil
      t.integer :author_id, null: false
      t.string :slug, null: false
      t.integer :channel_id, null: false

      t.timestamps
    end

    add_index :messages, :slug, unique: true

    add_foreign_key :messages, :channels
    add_foreign_key :messages, :users, column: :author_id
  end
end
