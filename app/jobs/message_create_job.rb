class MessageCreateJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable
      .server
      .broadcast(
        "channel:#{message.channel_id}",
        type: "CREATE",
        message: message
      )
  end
end
