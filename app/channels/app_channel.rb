class AppChannel < ApplicationCable::Channel
  def subscribed
    stream_from "app"
  end

  def unsubscribed
    stop_all_streams
  end
end