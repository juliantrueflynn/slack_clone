json.channel do
  json.(@channel, *@channel.attributes.keys)
  json.owner_slug @channel.owner ? @channel.owner.slug : nil
end

json.messages do
  json.array! @channel.all_messages.includes(:author, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug

    if message.is_child?
      json.parent_message_slug message.parent_message.slug
      json.last_read nil
      json.last_active nil
    else
      json.parent_message_slug nil
      read = message.reads.find_by(user_id: current_user.id)
      json.last_read read ? read.accessed_at : nil
    end
  end
end

json.favorites do
  json.array! @channel.favorites.with_user(current_user.id) do |favorite|
    json.(favorite, :id, :message_id, :user_id)
    json.message_slug favorite.message_slug
  end
end

json.reactions do
  json.array! @channel.reactions.includes(:message, :user) do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user ? reaction.user.slug : nil
  end
end

json.members @channel.members.pluck(:slug)

json.subs do
  json.array! @channel.subs do |chat_sub|
    json.(chat_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug chat_sub.user.slug
    json.channel_slug chat_sub.channel.slug
  end
end

json.reads do
  json.array! Read.messages_by_channel_id_and_user_id(@channel.id, current_user.id) do |read|
    json.(read, :id, :readable_id, :readable_type, :accessed_at)
    json.slug read.message.slug
  end
end