class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "workspace_#{params[:workspace_slug]}"
  end

  def unsubscribed
    current_user.appear!('OFFLINE', params[:workspace_slug])
  end

  def online(data)
    current_user.appear!('ONLINE', params[:workspace_slug])
  end

  def away
    current_user.appear!('AWAY', params[:workspace_slug])
  end
end
