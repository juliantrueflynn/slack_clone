class ChannelJob < ApplicationJob
  queue_as :default

  def perform(channel_slug, **args)
    ActionCable.server.broadcast("channel_#{channel_slug}", args)
  end
end
