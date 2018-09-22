class Unread < ApplicationRecord
  before_validation :ensure_workspace_id
  before_validation :generate_active_at_for_new_records

  validates_presence_of :active_at, :unreadable_id, :unreadable_type, :workspace_id
  validates_uniqueness_of :unreadable_type, scope: [:unreadable_id, :workspace_id]

  belongs_to :workspace
  belongs_to :channel, foreign_key: :unreadable_id, optional: true
  belongs_to :message, foreign_key: :unreadable_id, optional: true

  def self.channels_by_workspace_id_and_user_id(workspace_id, user_id)
    includes(:workspace, channel: :subs)
      .where(unreadable_type: 'Channel')
      .where(workspaces: { id: workspace_id })
      .where(channel_subs: { user_id: user_id })
  end

  def self.children_by_workspace_id_and_user_id(workspace_id, user_id)
    includes(message: :workspace)
      .where(unreadable_type: 'Message')
      .where(workspaces: { id: workspace_id })
      .where(messages: { author_id: user_id })
  end

  def self.parents_by_workspace_id_and_user_id(workspace_id, user_id)
    includes(message: :workspace)
      .where(unreadable_type: 'Message')
      .where(workspaces: { id: workspace_id })
      .where(messages: { id: Message.children_with_author_id(1).pluck(:id) })
  end

  def self.threads_by_workspace_id_and_user_id(workspace_id, user_id)
    children_by_workspace_id_and_user_id(workspace_id, user_id)
      .or(parents_by_workspace_id_and_user_id(workspace_id, user_id))
  end

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  private

  def ensure_workspace_id
    return if workspace_id?
    self.workspace = message.workspace if unreadable_type === 'Message'
    self.workspace = channel.workspace if unreadable_type === 'Channel'
  end

  def generate_active_at_for_new_records
    return unless new_record?

    self.active_at = message.created_at if unreadable_type === 'Message'

    if unreadable_type === 'Channel'
      last_message = channel.messages.where(parent_message_id: nil).last
      self.active_at = last_message ? last_message.created_at : nil
    end
  end
end
