class Unread < ApplicationRecord
  validates_presence_of :unreadable_id, :unreadable_type, :workspace_id
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

  after_update_commit :broadcast_update
end
