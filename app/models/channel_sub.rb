class ChannelSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel
  has_one :workspace, through: :channel

  def self.by_workspace_id(workspace_id)
    includes(:channel).where(channels: { workspace_id: workspace_id })
  end

  def self.by_user(user_id)
    find_by(user_id: user_id)
  end

  def self.shared_with_user_id(user_id)
    where(channel_id: where(user_id: user_id).pluck(:channel_id))
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  after_create_commit :broadcast_create_sub, :generate_sub_message_create
  after_destroy :generate_sub_message_destroy, :broadcast_destroy

  private

  def broadcast_create_sub
    broadcast_create if workspace.channels.length > 2
  end

  def generate_sub_message(entity_type)
    return if channel.has_dm?
    channel.messages.create(author_id: user_id, entity_type: entity_type)
  end

  def generate_sub_message_create
    generate_sub_message('sub_create')
  end

  def generate_sub_message_destroy
    generate_sub_message('sub_destroy')
  end
end
