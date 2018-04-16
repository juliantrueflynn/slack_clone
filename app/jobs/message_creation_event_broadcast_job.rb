class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default
  
  def perform(message)
    ActionCable
      .server
      .broadcast(
        'chat_channel',
        id: message.id,
        author_id: message.author_id,
        channel_id: message.channel_id,
        body: message.body
      )
  end
end