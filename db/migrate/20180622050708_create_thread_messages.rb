class CreateThreadMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :thread_messages do |t|
      t.text :body
      t.integer :author_id, null: false
      t.string :slug, null: false
      t.integer :parent_message_id, default: nil

      t.timestamps
    end

    add_index :thread_messages, :slug, unique: true

    add_foreign_key :thread_messages, :messages, column: :parent_message_id
    add_foreign_key :thread_messages, :users, column: :author_id
  end
end