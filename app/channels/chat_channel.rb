class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_slug = params[:channel_slug]
    stream_from "channel:#{channel_slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end