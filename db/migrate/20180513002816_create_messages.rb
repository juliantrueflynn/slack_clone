class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.string :parent_message_slug, default: nil
      t.string :author_slug, null: false
      t.string :slug, null: false
      t.string :channel_slug, null: false

      t.timestamps
    end

    add_index :messages, :slug, unique: true

    add_foreign_key :messages, :channels, column: :channel_slug, primary_key: :slug
    add_foreign_key :messages, :users, column: :author_slug, primary_key: :slug
  end
end
