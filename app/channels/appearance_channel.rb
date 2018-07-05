class AppearanceChannel < ApplicationCable::Channel
  after_unsubscribe :ensure_offline

  def ensure_offline
    appears = current_user.appears
    unless appears.empty?
      appears.each do |appearance|
        appearance.destroy.broadcast(status: 'OFFLINE', user_slug: current_user.slug)
      end
    end
  end

  def subscribed
    stream_from "appearance"
  end

  def unsubscribed
    stop_all_streams
  end
end
