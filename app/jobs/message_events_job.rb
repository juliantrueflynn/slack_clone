class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(args)
    channel_id = args[:data].channel_id

    ActionCable
      .server
      .broadcast(
        "channel:#{channel_id}",
        event: args[:event],
        data: args[:data]
      )
  end
end