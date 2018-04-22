class MessageEditEventBroadcastJob < ApplicationJob
  queue_as :default
  
  def perform(message)
    ActionCable
      .server
      .broadcast(
        'chat_channel',
        id: message.id,
        body: message.body
      )
  end
end