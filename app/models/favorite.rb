class Favorite < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id, scope: :user_id

  belongs_to :message
  belongs_to :user
  has_one :channel, through: :message
  has_one :workspace, through: :channel

  def self.with_user(user_id)
    where(user_id: user_id)
  end

  def self.by_user_and_message_id(user_id, message_ids)
    includes(:message).with_user(user_id).where(message_id: message_ids)
  end
end
