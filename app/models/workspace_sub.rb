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

  after_create_commit :generate_new_workspace_sub_defaults, :broadcast_create
  after_update_commit :broadcast_update, :generate_channel_sub_message

  private

  def generate_new_workspace_sub_defaults
    return if workspace.owner_id === user.id
    generate_default_channel_subs
    workspace.generate_default_channel_reads(user)
  end

  def generate_default_channel_subs
    user.channel_subs.create(default_channel_subs)
  end

  def generate_channel_sub_message
    user.messages.create(channel_sub_messages_params)
  end

  def default_channel_subs
    workspace.default_channels.reduce([]) do |memo, channel|
      memo << { channel_id: channel.id, skip_broadcast: true }
    end
  end

  def channel_sub_messages_params
    channels = user.channels.without_dm.by_workspace_id(workspace.id)

    channels.reduce([]) do |memo, channel|
      memo << { channel_id: channel.id, entity_type: message_entity_type }
    end
  end

  def message_entity_type
    self.is_member? ? 'sub_create' : 'sub_destroy'
  end
end
