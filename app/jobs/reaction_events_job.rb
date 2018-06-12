class ReactionEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    message = args[:reaction].message
    channel_slug = message.channel.slug
    ActionCable.server.broadcast("channel_#{channel_slug}", args)
  end
end
