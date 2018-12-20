class ChannelSub < ApplicationRecord
  attr_accessor :skip_broadcast

  default_scope { joins(:user) }

  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel
  has_one :workspace, through: :channel
  has_many :reads, through: :channel

  def self.find_by_slug(channel_slug)
    channel = Channel.find_by(slug: channel_slug)
    find_by(channel_id: channel.id)
  end

  def self.by_workspace_id(workspace_id)
    includes(:channel).where(channels: { workspace_id: workspace_id })
  end

  def self.shared_with_user_id(user_id)
    where(channel_id: where(user_id: user_id).pluck(:channel_id))
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  def channel_slug
    channel ? channel.slug : nil
  end

  def workspace_slug
    workspace ? workspace.slug : nil
  end

  after_create_commit :broadcast_create_sub, :generate_create_message
  after_destroy :generate_destroy_message, :broadcast_destroy

  private

  def broadcast_create_sub
    broadcast_create if workspace.channels.length > 2
  end

  def generate_create_message
    return if channel.has_dm?
    channel.messages.create(author_id: user_id, entity_type: 'sub_create')
  end

  def generate_destroy_message
    return if channel.has_dm?
    channel.messages.create(author_id: user_id, entity_type: 'sub_destroy')
  end
end
