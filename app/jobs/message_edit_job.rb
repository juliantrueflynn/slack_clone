class MessageEditJob < ApplicationJob
  queue_as :default
  
  def perform(message)
    ActionCable
      .server
      .broadcast(
        "channel:#{message.channel_id}",
        type: "EDIT",
        message: message
      )
  end
end