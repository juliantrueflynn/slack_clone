class Channel < ApplicationRecord
  validates :title, :owner_id, :workspace_id, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: 'User'
  belongs_to :workspace
end
