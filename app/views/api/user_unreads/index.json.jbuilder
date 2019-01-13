json.messages do
  json.array! @unreads.includes(:chatroom, :author) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.chatroom_slug message.chatroom.slug
  end
end

json.reactions do
  reactions = Reaction.with_message(@unreads)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end

json.favorites do
  favorites = current_user.favorites.with_message(@unreads)
  json.array! favorites, :id, :message_slug
end