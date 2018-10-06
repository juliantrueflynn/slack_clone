json.favorites do
  json.array! @favorites.joins(:message) do |favorite|
    json.(favorite, *favorite.attributes.keys)
    json.message_slug favorite.message.slug
  end
end

message_ids = @favorites.pluck(:message_id)

json.messages do
  messages = Message.where(id: message_ids).includes(:author, :channel)

  json.array! messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(message_ids)

  json.array! reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end
