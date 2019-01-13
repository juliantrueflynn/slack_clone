json.messages do
  json.array! @user_threads do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.chatroom_slug message.chatroom.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.reactions do
  reactions = Reaction.with_message(@user_threads)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end

json.favorites do
  favorites = current_user.favorites.with_message(@user_threads)
  json.array! favorites, :id, :message_slug
end