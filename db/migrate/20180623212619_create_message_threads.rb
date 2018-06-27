class CreateMessageThreads < ActiveRecord::Migration[5.1]
  def change
    create_table :message_threads do |t|
      t.integer :thread_id, default: nil
      t.integer :message_id, default: nil
      t.integer :author_id, null: false

      t.timestamps
    end

    add_index :message_threads, [:thread_id, :message_id, :author_id]
  end
end
