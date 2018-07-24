class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  after_create_commit :broadcast_create_sub
  after_destroy :broadcast_destroy

  private

  def sub_user_to_default_chats
    default_chats = workspace.channels.first(2)
    default_chats.each { |chat| user.channel_subs.create(channel_id: chat.id) }
  end

  def broadcast_create_sub
    return if user.id === workspace.owner.id
    sub_user_to_default_chats
    broadcast_create
  end
end
