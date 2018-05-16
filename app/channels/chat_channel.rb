class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    stream_from "channel:#{channel_id}"
  end

  def unsubscribed
    stop_all_streams
  end
end