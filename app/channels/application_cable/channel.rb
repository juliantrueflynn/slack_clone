module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def create(data)
      Message.create(
        body: data.fetch('body'),
        author_slug: data.fetch('author_slug'),
        channel_slug: data.fetch('channel_slug'),
        parent_message_slug: data.fetch('parent_message_slug')
      )
    end
  end
end
