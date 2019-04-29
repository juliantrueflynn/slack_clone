 class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def self.by_user(user_id)
    find_by_user_id(user_id)
  end

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def workspace_slug
    workspace&.slug
  end

  after_create_commit :generate_new_workspace_sub_defaults, :broadcast_create
  after_update_commit :broadcast_update, :generate_chatroom_sub_message

  private

  def generate_new_workspace_sub_defaults
    return if workspace.owner_id === user.id
    generate_default_chatroom_subs
    workspace.generate_default_chatrooms_reads(user)
  end

  def generate_default_chatroom_subs
    user.chatroom_subs.create(default_chatroom_subs)
  end

  def generate_chatroom_sub_message
    user.messages.create(chatroom_sub_messages_params)
  end

  def default_chatroom_subs
    workspace.default_chatrooms.reduce([]) do |memo, chatroom|
      memo << { chatroom_id: chatroom.id, skip_broadcast: true }
    end
  end

  def chatroom_sub_messages_params
    chatrooms = user.chatrooms.without_dm.with_workspace(workspace)

    chatrooms.reduce([]) do |memo, chatroom|
      memo << { chatroom_id: chatroom.id, entity_type: message_entity_type }
    end
  end

  def message_entity_type
    self.is_member? ? 'sub_create' : 'sub_destroy'
  end
end
