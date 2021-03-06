messages = Message.parents_or_children(@message.id)

json.messages do
  json.array! messages.includes(:author, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.chatroom do
  json.(@message.chatroom, :slug)
end

json.reactions do
  reactions = Reaction.with_message(@user_threads)
  json.array! reactions, :id, :emoji, :message_id, :message_slug, :user_slug
end

json.favorites do
  favorites = current_user.favorites.with_message(@user_threads)
  json.array! favorites, :id, :message_slug
end