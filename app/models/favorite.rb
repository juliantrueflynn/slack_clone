class Favorite < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id, scope: :user_id

  belongs_to :message
  belongs_to :user
  has_one :workspace, through: :channel

  def self.with_user(user_id)
    where(user_id: user_id)
  end
end
