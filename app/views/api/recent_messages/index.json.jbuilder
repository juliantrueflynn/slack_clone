first_message = @recent_messages.first
channel = first_message ? first_message.channel : nil

json.channel do
  if channel
    json.(channel, :slug)
  else
    json.nil!
  end
end

json.messages do
  json.array! @recent_messages.includes(:author, :parent_message) do |message|
    json.(message, :parent_message_slug, *message.attributes.keys)
    json.author_slug message.author.slug
  end
end

parents = @recent_messages.with_parent

json.reactions do
  reactions = Reaction.by_message_id(parents).includes(:user)

  json.array! reactions do |reaction|
    json.(reaction, :id, :emoji, :message_id, :message_slug, :user_slug)
  end
end

json.favorites do
  favorites = current_user.favorites.by_message_id(parents)
  json.array! favorites, :id, :message_slug
end