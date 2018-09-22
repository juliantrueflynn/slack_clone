json.message do
  json.(@message, *@message.attributes.keys)
  json.author_slug @message.author.slug
  json.channel_slug @message.channel.slug
end

json.child_messages do
  json.array! @message.replies.includes(:author, :parent_message) do |child|
    json.(child, *child.attributes.keys)
    json.parent_message_slug child.parent_message.slug
    json.author_slug child.author.slug
  end
end

replies = @message.replies.to_a
message_thread = replies.unshift(@message)
message_thread_ids = message_thread.pluck(:id)

json.favorites do
  favorites = current_user.favorites.includes(:message).where(message_id: message_thread_ids)

  json.array! favorites do |favorite|
    json.(favorite, :id, :message_id, :user_id)
    json.message_slug favorite.message.slug
  end
end

json.reactions do
  reactions = Reaction.includes(:user, :message).where(message_id: message_thread_ids)

  json.array! reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end

json.read do
  read = current_user.reads.by_message_id(@message.id)
  if read
    json.(read, :id, :readable_id, :readable_type, :accessed_at)
  else
    json.nil!
  end
end

json.unread do
  unread = Unread.find_by(unreadable_type: 'Message', unreadable_id: @message.id)
  if unread
    json.(unread, :id, :active_at, :unreadable_id, :unreadable_type)
  else
    json.nil!
  end
end