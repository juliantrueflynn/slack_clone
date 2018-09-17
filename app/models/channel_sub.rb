class ChannelSub < ApplicationRecord
  attr_accessor :skip_broadcast

  default_scope { joins(:user) }

  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel
  has_one :workspace, through: :channel

  def broadcast_name
    "channel_#{channel.slug}"
  end

  after_create_commit :broadcast_create_sub
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy

  private

  def broadcast_create_sub
    broadcast_create if workspace.channels.length > 2
  end
end
