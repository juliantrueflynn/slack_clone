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
  if @recent_messages.first
    channel = @recent_messages.first.channel
    json.(channel, :slug)
  else
    json.nil!
  end
end

json.favorites do
  user_id = current_user.id
  favorites = Favorite.by_user_and_message_id(user_id, @recent_messages)

  json.array! favorites do |favorite|
    json.(favorite, :id, :message_id)
    json.message_slug favorite.message.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@recent_messages)

  json.array! reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end
