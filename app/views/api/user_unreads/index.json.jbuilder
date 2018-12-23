all_messages = []

json.messages do
  json.array! @reads do |read|
    channel = read.channel
    parent_entry_messages = channel.messages.with_entry_type.with_parent
    messages = parent_entry_messages.includes(:author, :parent_message)
    unreads = messages.created_until(read.accessed_at)
    all_messages << unreads

    json.array! unreads do |message|
      json.(message, *message.attributes.keys)
      json.author_slug message.author.slug
      json.parent_message_slug message.parent_message_slug
      json.channel_slug channel.slug
    end
  end
end

flatten_messages = all_messages.flatten!

json.reactions do
  reactions = Reaction.by_message_id(flatten_messages)
  json.array! reactions, :id, :user_id, :emoji, :message_id, :message_slug
end

json.favorites do
  favorites = current_user.favorites.by_message_id(flatten_messages)
  json.array! favorites, :id, :message_id, :message_slug
end