class Unread < ApplicationRecord
  validates_presence_of :unreadable_id, :unreadable_type, :workspace_id, :user_id
  validates_uniqueness_of :unreadable_type, scope: [:unreadable_id, :workspace_id, :user_id]

  belongs_to :user
  belongs_to :workspace
  belongs_to :channel, foreign_key: :unreadable_id, optional: true
  belongs_to :message, foreign_key: :unreadable_id, optional: true
end
