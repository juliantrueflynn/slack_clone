class CreatePins < ActiveRecord::Migration[5.1]
  def change
    create_table :pins do |t|
      t.references :message, foreign_key: {on_delete: :cascade}, index: true
      t.references :user, foreign_key: {on_delete: :cascade}, index: false
    end
  end
end
