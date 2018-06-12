class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = args[:message].channel
    ActionCable.server.broadcast("channel_#{channel.slug}", args)
  end
end