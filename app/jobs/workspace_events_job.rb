class WorkspaceEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    workspace_slug = args[:workspace].slug

    ActionCable
      .server
      .broadcast(
        "workspace_#{workspace_slug}",
        args
      )
  end
end
