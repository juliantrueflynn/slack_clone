class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(args)
    channel_slug = args[:data].channel_slug

    ActionCable
      .server
      .broadcast(
        "channel:#{channel_slug}",
        event: args[:event],
        data: args[:data]
      )
  end
end