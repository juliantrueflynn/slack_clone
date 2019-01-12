class CreateChatroomSubs < ActiveRecord::Migration[5.1]
  def change
    create_table :chatroom_subs do |t|
      t.references :user, foreign_key: { on_delete: :cascade }, index: false
      t.references :chatroom, foreign_key: { on_delete: :cascade }, index: false
      t.boolean :in_sidebar, default: true

      t.timestamps
    end

    add_index :chatroom_subs, [:chatroom_id, :user_id], unique: true
  end
end
