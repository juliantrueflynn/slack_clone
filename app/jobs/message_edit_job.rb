class MessageEditJob < ApplicationJob
  queue_as :default
  
  def perform(message)
    ActionCable
      .server
      .broadcast(
        "message:#{message.id}",
        type: "EDIT",
        data: message
      )
  end
end