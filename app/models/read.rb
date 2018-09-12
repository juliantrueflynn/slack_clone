class Read < ApplicationRecord
  validates_presence_of :readable_id, :readable_type, :workspace_id, :user_id, :accessed_at
  validates_uniqueness_of :readable_type, scope: [:readable_id, :workspace_id, :user_id]

  belongs_to :user
  belongs_to :workspace
  belongs_to :channel, foreign_key: :readable_id, optional: true
  belongs_to :message, foreign_key: :readable_id, optional: true

  def self.messages_by_channel_id_and_user_id(channel_id, user_id)
    includes(:message)
    .where(readable_type: 'Message', user_id: user_id)
    .where(messages: { channel_id: channel_id })
  end

  def self.by_message_id(message_id)
    find_by(readable_id: message_id, readable_type: 'Message')
  end
end