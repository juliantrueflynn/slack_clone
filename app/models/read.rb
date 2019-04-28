class Read < ApplicationRecord
  validates_presence_of :readable_id, :readable_type, :workspace_id, :user_id, :accessed_at
  validates_uniqueness_of :readable_type, scope: [:readable_id, :workspace_id, :user_id]

  belongs_to :user
  belongs_to :workspace
  belongs_to :chatroom, foreign_key: :readable_id, optional: true
  belongs_to :message, foreign_key: :readable_id, optional: true

  def self.with_type(readable_type)
    where(readable_type: readable_type)
  end

  def self.messages
    with_type('Message')
  end

  def self.chatrooms
    with_type('Chatroom')
  end

  def self.chatrooms_with_user(user_id)
    chatrooms.where(user_id: user_id)
  end

  def associated_entity
    return if readable_type.nil?
    entity_obj = readable_type.constantize
    entity_obj.find_by_id(readable_id)
  end

  def slug
    associated_entity.slug unless associated_entity.nil?
  end

  before_validation :ensure_workspace_id, on: :create
  before_validation :generate_accessed_at

  private

  def ensure_workspace_id
    self.workspace_id ||= associated_entity.workspace.id if associated_entity
  end

  def generate_accessed_at
    self.accessed_at = DateTime.current
  end
end