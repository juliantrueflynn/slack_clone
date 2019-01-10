json.messages do
  json.array! @unreads.includes(:channel, :author) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@unreads)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end

json.favorites do
  favorites = current_user.favorites.by_message_id(@unreads)
  json.array! favorites, :id, :message_id, :message_slug
end