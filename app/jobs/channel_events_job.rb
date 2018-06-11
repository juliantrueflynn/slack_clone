class ChannelEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = args[:channel]
    workspace = channel.workspace
    WorkspaceChannel.broadcast_to("workspace_#{workspace.slug}", args)
  end
end
