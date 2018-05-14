class CreateChannelSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_subs do |t|
      t.string :user_slug, null: false
      t.string :channel_slug, null: false

      t.timestamps
    end

    add_index :channel_subs, [:channel_slug, :user_slug], unique: true

    add_foreign_key :channel_subs, :channels, column: :channel_slug, primary_key: :slug
    add_foreign_key :channel_subs, :users, column: :user_slug, primary_key: :slug
  end
end
