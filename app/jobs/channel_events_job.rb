class ChannelEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = Channel.find_by(id: args[:channel].id)

    WorkspaceChannel.broadcast_to(channel.workspace, args)
  end
end
