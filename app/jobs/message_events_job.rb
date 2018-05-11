class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(args)
    channel = Channel.find_by(id: args[:data].channel_id)
    
    ActionCable
      .server
      .broadcast(
        "channel:#{channel.slug}",
        event: args[:event],
        data: args[:data]
      )
  end
end