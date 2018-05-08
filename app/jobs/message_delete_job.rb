class MessageDeleteJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable
      .server
      .broadcast(
        "channel:#{message.channel_id}",
        type: "DELETE",
        message: message
      )
  end
end
