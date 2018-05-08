class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def unsubscribed
    stop_all_streams
  end
end