class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.string :parent_message_slug, default: nil
      t.integer :author_id, null: false
      t.string :slug, null: false
      t.references :channel, foreign_key: true, index: true, null: false

      t.timestamps
    end

    add_index :messages, :slug, unique: true

    add_foreign_key :messages, :messages, column: :parent_message_slug, primary_key: :slug
    add_foreign_key :messages, :users, column: :author_id
  end
end
