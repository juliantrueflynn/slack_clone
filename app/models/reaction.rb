class Reaction < ApplicationRecord
  validates_presence_of :message_id, :user_id, :emoji
  validates_uniqueness_of :user_id, scope: [:message_id, :emoji]

  belongs_to :user
  belongs_to :message
  has_one :channel, through: :message

  def self.by_message_id(message_ids)
    includes(:message).where(message_id: message_ids)
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  def message_slug
    message.slug
  end

  def user_slug
    user.slug
  end
  
  after_create_commit :broadcast_create
  after_destroy :broadcast_destroy
end
