json.messages do
  json.array! @user_threads do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@user_threads)
  json.array! reactions, :id, :user_id, :emoji, :message_id, :message_slug
end

json.favorites do
  favorites = current_user.favorites.by_message_id(@user_threads)
  json.array! favorites, :id, :message_id, :message_slug
end