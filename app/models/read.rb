class Read < ApplicationRecord
  attr_accessor :skip_callbacks

  before_validation :ensure_workspace_id
  before_validation :generate_accessed_at

  validates_presence_of :readable_id, :readable_type, :workspace_id, :user_id, :accessed_at
  validates_uniqueness_of :readable_type, scope: [:readable_id, :workspace_id, :user_id]

  belongs_to :user
  belongs_to :workspace
  belongs_to :channel, foreign_key: :readable_id, optional: true
  belongs_to :message, foreign_key: :readable_id, optional: true

  def self.messages_by_channel_id_and_user_id(channel_id, user_id)
    joins(:message)
      .where(readable_type: 'Message', user_id: user_id)
      .where(messages: { channel_id: channel_id })
  end

  def self.channels_in_workspace_with_user(workspace_id, user_id)
    where(workspace_id: workspace_id, user_id: user_id, readable_type: 'Channel')
  end

  def self.by_message_id(message_id)
    find_by(readable_id: message_id, readable_type: 'Message')
  end

  def self.by_user_id(user_id)
    find_by(user_id: user_id)
  end

  private

  def ensure_workspace_id
    return if workspace_id?
    self.workspace = message.workspace if readable_type === 'Message'
    self.workspace = channel.workspace if readable_type === 'Channel'
  end

  def generate_accessed_at
    return if skip_callbacks
    self.accessed_at = DateTime.now
  end
end