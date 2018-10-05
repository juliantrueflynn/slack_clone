json.channel do
  json.(@channel, *@channel.attributes.keys)
end

json.messages do
  if params[:until_date]
    until_date = DateTime.parse(params[:until_date])
    messages = Message.created_previously(@channel.id, until_date)
  else
    messages = Message.created_recently(@channel.id)
  end

  json.array! messages.includes(:parent_message, :author) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug

    if message.is_child?
      json.parent_message_slug message.parent_message.slug
    end
  end
end

json.favorites do
  json.array! @channel.favorites.with_user(current_user.id) do |favorite|
    json.(favorite, :id, :message_id)
    json.message_slug favorite.message_slug
  end
end

json.reactions do
  json.array! @channel.reactions.includes(:message, :user) do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end

json.members @channel.members.pluck(:slug)
