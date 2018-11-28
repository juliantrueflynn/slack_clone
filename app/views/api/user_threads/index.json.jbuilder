json.messages do
  json.array! @user_threads do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
    json.parent_message_slug message.parent_message.slug if message.is_child? 
  end
end

json.reactions do
  reactions = Reaction.where(message_id: @user_threads).includes(:message, :user)

  json.array! reactions do |reaction|
    json.(reaction, :id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end

json.favorites do
  favorites = current_user.favorites.where(message_id: @user_threads)

  json.array! favorites do |favorite|
    json.(favorite, :id)
    json.message_slug favorite.message.slug
  end
end