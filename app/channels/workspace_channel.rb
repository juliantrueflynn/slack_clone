class WorkspaceChannel < ApplicationCable::Channel
  after_unsubscribe :ensure_offline

  def subscribed
    slug = params[:workspace_slug]
    stream_from "workspace_#{slug}"
  end

  def unsubscribed
    stop_all_streams
  end

  def ensure_offline
    unless current_user.appears.empty?
      current_user.appears.each { |appear| appear.destroy }
    end
  end
end
