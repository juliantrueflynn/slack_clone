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

  after_create_commit :broadcast_create_sub, :generate_read, :generate_create_message
  after_update_commit :broadcast_update
  after_destroy :generate_destroy_message, :broadcast_destroy

  private

  def generate_read
    return if channel.has_dm
    channel.reads.create(readable_type: 'Channel', user_id: user.id)
  end

  def broadcast_create_sub
    broadcast_create if workspace.channels.length > 2
  end

  def generate_create_message
    channel.messages.create(
      author_id: user_id,
      entity_type: 'sub_create',
      created_at: created_at,
      updated_at: created_at
    )
  end

  def generate_destroy_message
    channel.messages.create(author_id: user_id, entity_type: 'sub_destroy')
  end
end
