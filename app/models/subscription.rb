class Subscription < ApplicationRecord
  validates :workspace_id, :user_id, presence: true

  belongs_to :user
  belongs_to :workspace
end
