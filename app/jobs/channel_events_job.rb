class ChannelEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    workspace = args[:channel].workspace
    ActionCable.server.broadcast("workspace_#{workspace.slug}", args)
  end
end
