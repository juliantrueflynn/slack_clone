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

  def self.convos_by_workspace_and_user(workspace_id, user_id)
    convos = Message.convo_ids_by_workspace_and_user(workspace_id, user_id)
    Unread.where(unreadable_id: convos, unreadable_type: 'Message')
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
      last_message = channel.messages.without_children.last
      self.active_at = last_message ? last_message.created_at : nil
    end
  end
end
