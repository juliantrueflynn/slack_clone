class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  after_create_commit :sub_default_chats

  private

  def default_chats
    workspace.channels.first(2)
  end

  def sub_default_chats
    default_chats.each { |chat| user.channel_subs.create(channel_id: chat.id) }
  end

  after_create_commit :broadcast_create, unless: :skip_broadcast?
  after_destroy :broadcast_destroy, unless: :skip_broadcast?
end
