class MessageThread < ApplicationRecord
  validates_presence_of :author

  belongs_to :parent_message, class_name: 'Message', foreign_key: :thread_id
  belongs_to :child_message, class_name: 'Message', foreign_key: :message_id
  belongs_to :message, ->(message_thread) { Message.find_by(id: message_thread.message_id) }
  belongs_to :author, class_name: 'User'
  has_one :channel, through: :parent_message

  private

  after_create_commit do
    ChannelJob.perform_later(
      channel.slug,
      type: 'THREAD_MESSAGE_CREATE_RECEIVE',
      message: message,
      parent_message_slug: parent_message.slug
    )
  end
end
