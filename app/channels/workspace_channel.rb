class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    @workspace_slug = params[:workspace_slug]
    stream_from "workspace_#{@workspace_slug}"
    current_user.appear!('ONLINE', @workspace_slug)
  end

  def unsubscribed
    current_user.appear!('OFFLINE', @workspace_slug)
  end

  def away
    current_user.appear!('AWAY', @workspace_slug)
  end
end
