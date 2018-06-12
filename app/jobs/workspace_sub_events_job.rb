class WorkspaceSubEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    workspace = args[:workspace_sub].workspace
    ActionCable.server.broadcast("workspace_#{workspace.slug}", args)
  end
end
