class AppearanceChannel < ApplicationCable::Channel
  after_unsubscribe :ensure_offline

  def ensure_offline
    unless current_user.appears.empty?
      current_user.appears.each { |appear| appear.broadcast 'OFFLINE' }
    end
  end

  def subscribed
    stream_from "appearance"
  end

  def unsubscribed
    stop_all_streams
  end
end
