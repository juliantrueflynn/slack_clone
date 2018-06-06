class WorkspaceEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    ActionCable.server.broadcast("app", args)
  end
end
