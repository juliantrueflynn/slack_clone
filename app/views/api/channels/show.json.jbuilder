json.channel do
  json.(@channel, :owner_slug, *@channel.attributes.keys)
end

json.workspace_slug @channel.workspace.slug

json.messages do
  pins_message_ids = @channel.pins.pluck(:message_id)
  messages = Message.where(id: pins_message_ids).includes(:author)

  json.array! messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug @channel.slug
  end
end
