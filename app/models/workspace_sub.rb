 class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace
  has_many :favorites, through: :user

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def workspace_slug
    workspace ? workspace.slug : nil
  end

  after_create_commit :broadcast_create_sub
  after_update_commit :broadcast_update, :generate_channel_sub_messages

  private

  def sub_user_to_default_chats
    return if (workspace.owner_id === user.id)

    default_chats = workspace.channels.first(2)
    default_chats.each do |chat|
      next if chat.is_user_sub?(user.id)
      user.channel_subs.create(channel_id: chat.id, skip_broadcast: true)
    end
  end

  def default_sub_message_params
    date = DateTime.current
    { author_id: user_id, created_at: date, updated_at: date }
  end

  def create_sub_messages(entity_type)
    channels = user.channels.without_dm.by_workspace_id(workspace.id)

    channels.reduce([]) do |memo, channel|
      channel_hash = { channel_id: channel.id, entity_type: entity_type }
      memo << channel_hash.merge(default_sub_message_params)
    end
  end

  def generate_channel_sub_messages
    entity_type = is_member ? 'sub_create' : 'sub_destroy'
    sub_entries = create_sub_messages(entity_type)
    Message.create(sub_entries)
  end

  def broadcast_create_sub
    return if workspace.channels.empty?
    sub_user_to_default_chats
    broadcast_create
  end
end
