json.favorites do
  favorites = @favorites.includes(:message)

  json.array! favorites, :id, :message_slug, :created_at
end

message_ids = @favorites.pluck(:message_id)

json.messages do
  messages = Message.where(id: message_ids)

  json.array! messages.includes(:author, :chatroom, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.chatroom_slug message.chatroom.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.reactions do
  reactions = Reaction.with_message(message_ids)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end
