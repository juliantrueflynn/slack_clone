class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    slug = params[:workspace_slug]
    stream_from "workspace_#{slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end
