class CreateReads < ActiveRecord::Migration[5.1]
  def change
    create_table :reads do |t|
      t.references :readable, polymorphic: true, index: false
      t.references :user, foreign_key: true, index: false
      t.datetime :accessed_at, null: false

      t.timestamp :created_at
    end

    add_index :reads, [:readable_type, :readable_id, :user_id]
  end
end
