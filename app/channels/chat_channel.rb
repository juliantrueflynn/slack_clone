class ChatChannel < ApplicationCable::Channel
  def subscribed
    chatroom_slug = params[:chatroom_slug]
    stream_from "channel_#{chatroom_slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end