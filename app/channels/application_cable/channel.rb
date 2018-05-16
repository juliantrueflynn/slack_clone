module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def create(data)
      Message.create(
        body: data.fetch('body'),
        author_id: data.fetch('author_id'),
        channel_id: data.fetch('channel_id'),
        parent_message_id: data.fetch('parent_message_id')
      )
    end
  end
end
