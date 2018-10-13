class AppearanceChannel < ApplicationCable::Channel
  before_unsubscribe :ensure_offline

  def subscribed
    @slug = params[:workspace_slug]
    stream_from "appearance_#{@slug}"
  end

  def unsubscribed
    if current_user.appears.in_workspace(@slug)
      current_user.appears.in_workspace(@slug).destroy
    end

    stop_all_streams
  end

  def ensure_offline
    return unless current_user.appears.in_workspace(@slug)
    current_user.appears.in_workspace(@slug).destroy
  end
end
