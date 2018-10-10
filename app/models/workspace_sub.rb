 class WorkspaceSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace
  has_many :favorites, through: :user

  def broadcast_name
    "app"
  end

  after_create_commit :broadcast_create_sub
  after_destroy :broadcast_destroy_subs

  private

  def sub_user_to_default_chats
    return if (workspace.owner_id === user.id)

    default_chats = workspace.channels.first(2)
    default_chats.each do |chat|
      next if chat.is_user_sub?(user.id)
      user.channel_subs.create(channel_id: chat.id, skip_broadcast: true)
    end
  end

  def broadcast_create_sub
    return if workspace.channels.empty?
    sub_user_to_default_chats
    broadcast_create
  end

  def broadcast_destroy_subs
    broadcast_destroy
  end
end
