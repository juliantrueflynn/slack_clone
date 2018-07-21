class WorkspaceChannel < ApplicationCable::Channel
  before_unsubscribe :offline

  def subscribed
    slug = params[:workspace_slug]
    @appears = current_user.appears.find_or_initialize_by(workspace_slug: slug)
    stream_from "workspace_#{slug}"
  end

  def unsubscribed
    stop_all_streams
  end

  def online
    @appears.online!
  end

  def offline
    @appears.destroy
  end

  def away
    @appears.away!
  end

  def busy
    @appears.busy!
  end
end
