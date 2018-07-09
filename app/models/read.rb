class Read < ApplicationRecord
  validates_presence_of :readable_id, :readable_type, :user_id, :accessed_at
  validates_uniqueness_of :readable_type, scope: [:readable_id, :user_id]

  belongs_to :readable, polymorphic: true
end
