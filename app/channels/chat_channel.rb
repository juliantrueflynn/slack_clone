class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(options)
    Message.create(
      body: options.fetch('body'),
      author_id: options.fetch('author_id'),
      channel_id: options.fetch('channel_id'),
      parent_message_id: options.fetch('parent_message_id')
    )
  end

  def update(options)
    message = Message.find_by(id: options.fetch('id'))
    message.update(body: options.fetch('body'))
  end

  def delete(options)
    message = Message.find_by(id: options.fetch('id'))
    message.destroy
  end
end