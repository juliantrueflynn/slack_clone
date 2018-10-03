json.messages do
  json.array! @recent_messages.includes(:author, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug

    if message.is_child?
      json.parent_message_slug message.parent_message.slug
    end
  end
end

json.channel do
  channel = @recent_messages.first.channel
  json.(channel, :slug)
end

json.favorites do
  favorites = Favorite.where(user_id: current_user.id, message_id: @recent_messages)

  json.array! favorites.includes(:message) do |favorite|
    json.(favorite, :id, :message_id)
    json.message_slug favorite.message.slug
  end
end

json.reactions do
  reactions = Reaction.where(message_id: @recent_messages)

  json.array! reactions.includes(:message, :user) do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end
