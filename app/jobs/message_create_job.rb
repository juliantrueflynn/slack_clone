class MessageCreateJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable
      .server
      .broadcast(
        "channel:#{message.channel_id}",
        id: message.id,
        author_id: message.author_id,
        channel_id: message.channel_id,
        body: message.body,
        parent_message_id: message.parent_message_id
      )
  end
end
