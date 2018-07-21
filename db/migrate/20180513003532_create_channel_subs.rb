class CreateChannelSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_subs do |t|
      t.references :user, foreign_key: {on_delete: :cascade}, index: false
      t.references :channel, foreign_key: {on_delete: :cascade}, index: false
      t.boolean :in_sidebar, default: true

      t.timestamps
    end

    add_index :channel_subs, [:channel_id, :user_id], unique: true
  end
end
