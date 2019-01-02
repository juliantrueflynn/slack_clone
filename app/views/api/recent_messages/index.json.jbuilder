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
  reactions = Reaction.by_message_id(parents)
  json.array! reactions, :id, :user_id, :emoji, :message_id, :message_slug
end

json.pins do
  pins = Pin.where(message_id: parents).includes(:message, :user)
  json.array! pins, :id, :user_id, :message_id, :message_slug, :user_slug
end

json.favorites do
  favorites = current_user.favorites.by_message_id(parents)
  json.array! favorites, :id, :message_id, :message_slug
end