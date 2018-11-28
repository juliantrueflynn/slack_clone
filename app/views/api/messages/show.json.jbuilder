messages = Message.parents_or_children(@message.id)

json.messages do
  json.array! messages.includes(:author, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug

    if message.is_child?
      json.parent_message_slug message.parent_message.slug
    end
  end
end

json.channel do
  json.(@message.channel, :slug)
end

json.favorites do
  favorites = Favorite.by_user_and_message_id(current_user.id, messages)

  json.array! favorites do |favorite|
    json.(favorite, :id, :message_id, :user_id)
    json.message_slug favorite.message.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(messages)

  json.array! reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end

