class AppearanceChannel < ApplicationCable::Channel
  before_unsubscribe :offline

  def subscribed
    @slug = params[:workspace_slug]
    stream_from "appearance_#{@slug}"
  end

  def unsubscribed
    stop_all_streams
  end

  def offline
    current_user.offline!(@slug)
  end
end
