class Favorite < ApplicationRecord
  validates_presence_of :workspace_id, :message_id, :user_id
  validates_uniqueness_of :workspace_id, scope: [:message_id, :user_id]

  belongs_to :workspace
  belongs_to :message
  belongs_to :user

  def self.by_message_id(message_ids)
    includes(:message).where(message_id: message_ids)
  end

  def self.in_workspace(workspace_id)
    where(workspace_id: workspace_id)
  end

  def message_slug
    message.slug
  end

  before_validation :generate_workspace_id

  private

  def generate_workspace_id
    self.workspace ||= message.workspace
  end
end
