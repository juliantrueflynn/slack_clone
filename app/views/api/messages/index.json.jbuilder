json.channel do
  json.(@channel, *@channel.attributes.keys)
  json.owner_slug @channel.owner_slug
end

messages = @channel.history_messages(params[:until_date])

json.messages do
  json.array! messages.includes(:parent_message, :author) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug

    if message.is_child?
      json.parent_message_slug message.parent_message.slug
    end
  end
end

json.favorites do
  favorites = Favorite.by_user_and_message_id(current_user.id, messages)

  json.array! favorites do |favorite|
    json.(favorite, :id, :message_id)
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

json.pins do
  pins = Pin.where(message_id: messages).includes(:message, :user)

  json.array! pins, :id, :user_id, :message_id, :message_slug, :user_slug
end

json.members @channel.members.pluck(:slug)
