class MessageDeleteJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable
      .server
      .broadcast(
        "message:#{message.id}",
        type: "DELETE",
        data: message.id
      )
  end
end
