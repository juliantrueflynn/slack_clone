class UserChannel < ApplicationCable::Channel
  after_subscribe :online
  after_unsubscribe :offline

  def subscribed
    workspace_slug = params[:workspace_slug]
    @appears = current_user.appears.find_or_create_by_workspace_slug(workspace_slug)
    stream_from "workspaces:#{workspace_slug}:users:#{current_user.slug}"
  end

  def unsubscribed
    stop_all_streams
  end

  def online
    broadcast('ONLINE') if @appears
  end

  def offline
    broadcast('OFFLINE') if @appears.destroy
  end

  def status(appearance)
    broadcast(appearance_params.status) if appears.update(appearance_params)
  end

  private

  def broadcast(status)
    @appears.broadcast status: status, user_slug: current_user.slug
  end
end
