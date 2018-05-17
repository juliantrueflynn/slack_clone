class MessageEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = Channel.find_by(id: args[:message].channel_id)

    ActionCable
      .server
      .broadcast(
        "channel:#{channel.id}",
        args
      )
  end
end