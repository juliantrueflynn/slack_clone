messages = Message.parents_or_children(@message.id)

json.messages do
  json.array! messages.includes(:author, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.channel do
  json.(@message.channel, :slug)
end

json.reactions do
  reactions = Reaction.by_message_id(@user_threads)
  json.array! reactions, :id, :emoji, :message_id, :message_slug, :user_slug
end

json.favorites do
  favorites = current_user.favorites.by_message_id(@user_threads)
  json.array! favorites, :id, :message_id, :message_slug
end