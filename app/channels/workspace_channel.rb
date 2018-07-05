class WorkspaceChannel < ApplicationCable::Channel
  after_unsubscribe :offline

  def subscribed
    workspace_slug = params[:workspace_slug]
    @appears = current_user.appears.find_or_create_by_workspace_slug(workspace_slug)
    stream_from "workspace_#{workspace_slug}"
  end

  def unsubscribed
    stop_all_streams
  end

  def online
    broadcast if @appears
  end

  def offline
    broadcast(status: 'OFFLINE') if @appears && @appears.destroy!
  end

  def away
    broadcast if @appears.away!
  end

  def busy
    broadcast if @appears.busy!
  end

  private

  def broadcast(params = {})
    defaults = { user_slug: current_user.slug }
    options = defaults.merge(params)
    @appears.broadcast(options)
  end
end
