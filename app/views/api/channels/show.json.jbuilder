pins_message_ids = @channel.pins.pluck(:message_id)
messages = Message.where(id: pins_message_ids).includes(:author)

json.array! messages do |message|
  json.(message, *message.attributes.keys)
  json.author_slug message.author.slug
  json.channel_slug params[:slug]
end