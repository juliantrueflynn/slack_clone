class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(args)
    channel = Channel.find_by(slug: args[:data].channel_id)
    
    ActionCable
      .server
      .broadcast(
        "channel:#{channel.id}",
        event: args[:event],
        data: args[:data]
      )
  end
end