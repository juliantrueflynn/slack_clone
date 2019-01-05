 class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def workspace_slug
    workspace ? workspace.slug : nil
  end

  after_create_commit :generate_default_channel_subs, :broadcast_create
  after_update_commit :broadcast_update, :generate_channel_sub_message

  private

  def generate_default_channel_subs
    return if workspace.channels.empty?
    return if workspace.owner_id === user.id
    user.channel_subs.create(default_channel_subs)
  end

  def generate_channel_sub_message
    Message.create(channel_sub_messages)
  end

  def default_channel_subs
    default_channels = workspace.channels.first(2)

    default_channels.reduce([]) do |memo, channel|
      memo << { channel_id: channel.id, skip_broadcast: true }
    end
  end

  def channel_sub_messages
    channels = user.channels.without_dm.by_workspace_id(workspace.id)

    channels.reduce([]) do |memo, channel|
      memo << {
        channel_id: channel.id,
        entity_type: message_entity_type,
        author_id: user_id
      }
    end
  end

  def message_entity_type
    self.is_member? ? 'sub_create' : 'sub_destroy'
  end
end
