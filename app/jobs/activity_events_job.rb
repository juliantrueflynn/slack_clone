class ActivityEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    message_id = args[:favorite].message_id
    message = Message.find_by(id: message_id)
    channel_id = message.channel.id

    args[:message_slug] = message.slug

    ActionCable.server.broadcast("channel:#{channel_id}", args)
  end
end
