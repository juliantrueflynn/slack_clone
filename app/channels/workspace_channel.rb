class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "workspaces"
  end

  def unsubscribed
    stop_all_streams
  end
end
