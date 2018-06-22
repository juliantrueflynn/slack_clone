class CreateReactions < ActiveRecord::Migration[5.1]
  def change
    create_table :reactions do |t|
      t.references :reactionable, polymorphic: true, index: true, null: false
      t.references :user, index: true, foreign_key: true, null: false
      t.string :emoji, null: false

      t.timestamps
    end
  end
end
