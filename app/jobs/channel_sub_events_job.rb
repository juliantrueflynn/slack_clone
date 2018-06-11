class ChannelSubEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    channel = Channel.find_by(id: args[:channel_sub].channel_id)
    workspace_slug = channel.workspace.slug

    ActionCable.server.broadcast("workspace_#{workspace_slug}", args)
  end
end
