class ReactionEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    message_id = args[:reaction].message_id
    message = Message.find_by(id: message_id)
    channel_id = message.channel.id

    ActionCable.server.broadcast("channel:#{channel_id}", args)
  end
end
