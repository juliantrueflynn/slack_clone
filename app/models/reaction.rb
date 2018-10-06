class Reaction < ApplicationRecord
  attr_accessor :skip_broadcast

  validates :message_id, :user_id, :emoji, presence: true

  belongs_to :user
  belongs_to :message
  has_one :channel, through: :message

  def broadcast_name
    "channel_#{channel.slug}"
  end
  
  def self.by_message_id(message_ids)
    includes(:user, :message).where(message_id: message_ids)
  end

  after_create_commit :broadcast_create
  after_destroy :broadcast_destroy
end
