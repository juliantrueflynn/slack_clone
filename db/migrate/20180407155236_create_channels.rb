class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :title, null: false
      t.text :topic
      t.integer :owner_id, null: false

      t.timestamps
    end

    add_index :channels, :owner_id
  end
end
