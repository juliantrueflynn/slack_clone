class ChatroomSub < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :chatroom_id, scope: :user_id

  belongs_to :user
  belongs_to :chatroom
  has_one :workspace, through: :chatroom

  def self.with_workspace(workspace_id)
    includes(:chatroom).where(chatrooms: { workspace_id: workspace_id })
  end

  def self.with_user(user_id)
    where(user_id: user_id)
  end

  def self.by_user(user_id)
    find_by_user_id(user_id)
  end

  def self.chatroom_ids_with_user(user_id)
    with_user(user_id).pluck(:chatroom_id)
  end

  def self.shared_with_user_id(user_id)
    where(chatroom_id: chatroom_ids_with_user(user_id))
  end

  def broadcast_name
    "chatroom_#{chatroom.slug}"
  end

  after_create_commit :broadcast_create_sub, :generate_sub_message_create
  after_destroy_commit :generate_sub_message_destroy, :broadcast_destroy

  private

  def broadcast_create_sub
    broadcast_create if workspace.chatrooms.length > 2
  end

  def generate_sub_message(entity_type)
    return if chatroom.has_dm?
    chatroom.messages.create(author_id: user_id, entity_type: entity_type)
  end

  def generate_sub_message_create
    generate_sub_message('sub_create')
  end

  def generate_sub_message_destroy
    generate_sub_message('sub_destroy')
  end
end
