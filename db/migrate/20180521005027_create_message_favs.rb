class CreateMessageFavs < ActiveRecord::Migration[5.1]
  def change
    create_table :message_favs do |t|
      t.references :message, foreign_key: true, index: false
      t.references :user, foreign_key: true, index: false

      t.timestamps
    end

    add_index :message_favs, [:message_id, :user_id], unique: true
  end
end
