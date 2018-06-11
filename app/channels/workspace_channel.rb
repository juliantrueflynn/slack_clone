class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    @workspace = Workspace.find_by(slug: params[:workspace_slug])
    stream_for @workspace
    current_user.appear!('ONLINE', @workspace)
  end

  def unsubscribed
    current_user.appear!('OFFLINE', @workspace)
  end

  def away
    current_user.appear!('AWAY', @workspace)
  end
end
