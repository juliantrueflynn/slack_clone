class AppearanceChannel < ApplicationCable::Channel
  after_unsubscribe :ensure_offline

  def ensure_offline
    unless current_user.appears.empty?
      current_user.appears.each { |appear| appear.destroy }
    end
  end

  def subscribed
    workspace_slug = params[:workspace_slug]
    stream_from "appearance_#{workspace_slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end
