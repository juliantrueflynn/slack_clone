json.channel do
  json.(@channel, :owner_slug, *@channel.attributes.keys)
end

json.workspace_slug @channel.workspace.slug

pins = @channel.pins.includes(:user, :message)

json.pins do
  json.array! pins do |pin|
    json.(pin, :message_slug, :user_slug, *pin.attributes.keys)
  end
end

json.messages do
  messages = Message.where(id: pins.pluck(:message_id)).includes(:author)

  json.array! messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug @channel.slug
  end
end
