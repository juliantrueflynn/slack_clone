class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    chatroom_slug = params[:chatroom_slug]
    stream_from "chatroom_#{chatroom_slug}"
  end

  def unsubscribed
    stop_all_streams
  end
end