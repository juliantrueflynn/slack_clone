class WorkspaceJob < ApplicationJob
  queue_as :default

  def perform(workspace_slug, **args)
    ActionCable.server.broadcast("workspace_#{workspace_slug}", args)
  end
end
