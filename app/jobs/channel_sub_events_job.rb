class ChannelSubEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = args[:channel_sub].channel
    workspace_slug = channel.workspace.slug
    ActionCable.server.broadcast("workspace_#{workspace_slug}", args)
  end
end
