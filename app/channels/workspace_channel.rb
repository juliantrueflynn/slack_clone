class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    workspace_slug = params[:workspace_slug]
    stream_from "workspace_#{workspace_slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end
