class WorkspaceEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    ActionCable
      .server
      .broadcast(
        "workspaces",
        args
      )
  end
end
