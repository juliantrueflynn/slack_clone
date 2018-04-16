class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(opts)
    Message.create(
      body: opts.fetch('body'),
      author_id: opts.fetch('author_id'),
      channel_id: opts.fetch('channel_id'),
      parent_message_id: opts.fetch('parent_message_id')
    )
  end
end