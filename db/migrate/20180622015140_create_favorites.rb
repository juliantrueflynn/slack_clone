class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.references :favoriteable, polymorphic: true, index: true, null: false

      t.timestamps
    end
  end
end
