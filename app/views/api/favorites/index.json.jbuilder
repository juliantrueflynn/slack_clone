json.favorites do
  favorites = @favorites.includes(:message)

  json.array! favorites, :id, :message_slug, :created_at
end

message_ids = @favorites.pluck(:message_id)

json.messages do
  messages = Message.where(id: message_ids)

  json.array! messages.includes(:author, :channel, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(message_ids).includes(:user)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end
