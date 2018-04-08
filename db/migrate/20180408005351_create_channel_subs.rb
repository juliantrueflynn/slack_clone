class CreateChannelSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :channel_subs do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false

      t.timestamps
    end

    add_index :channel_subs, [:channel_id, :user_id], unique: true
  end
end
