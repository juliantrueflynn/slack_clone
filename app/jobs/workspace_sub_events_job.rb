class WorkspaceSubEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    workspace = Workspace.find_by(id: args[:workspace_sub].workspace_id)

    ActionCable
      .server
      .broadcast(
        "workspace_#{workspace.slug}",
        args
      )
  end
end
