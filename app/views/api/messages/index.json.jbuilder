json.channel do
  json.(@channel, :slug, :owner_slug, :topic, :created_at, :earliest_message_slug)
end

messages = @channel.older_messages(params[:until_date])

json.messages do
  json.array! messages.includes(:parent_message, :author) do |message|
    json.(message, :parent_message_slug, *message.attributes.keys)
    json.author_slug message.author.slug
  end
end

parents = messages.with_parent

json.reactions do
  reactions = Reaction.by_message_id(parents)

  json.array! reactions, :id, :user_id, :emoji, :message_id, :message_slug
end

json.pins do
  pins = @channel.pins.includes(:message, :user)

  json.array! pins, :id, :user_id, :message_id, :message_slug, :user_slug
end

json.favorites do
  favorites = current_user.favorites.by_message_id(parents)
  json.array! favorites, :id, :message_id, :message_slug
end

json.members @channel.members.pluck(:slug)
