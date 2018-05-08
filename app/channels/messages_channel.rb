class MessagesChannel < ApplicationCable::Channel
  def subscribed
    message_id = params[:message_id]
    stream_from "message:#{message_id}"
  end

  def unsubscribed
    stop_all_streams 
  end

  def update(data)
    message = Message.find_by(id: data.fetch('id'))
    message.update(body: data.fetch('body'))
  end

  def delete(data)
    message = Message.find_by(id: data.fetch('id'))
    message.destroy
  end
end
