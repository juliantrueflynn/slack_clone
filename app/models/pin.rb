class Pin < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id

  belongs_to :message
  belongs_to :user
  has_one :channel, through: :message

  def broadcast_name
    "channel_#{channel_slug}"
  end

  def message_slug
    message.slug
  end

  def user_slug
    user.slug
  end

  def channel_slug
    channel ? channel.slug : nil
  end

  private

  after_create_commit :broadcast_create
  after_destroy :broadcast_destroy
end