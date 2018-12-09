json.channel do
  json.(@channel, :id, :slug, :owner_id, :owner_slug, :topic, :has_dm, :created_at)
end

until_date = params[:until_date] ? DateTime.parse(params[:until_date]) : nil
messages = @channel.history_messages(until_date)

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
  pins = Pin.where(message_id: parents).includes(:message, :user)
  json.array! pins, :id, :user_id, :message_id, :message_slug, :user_slug
end

json.members @channel.members.pluck(:slug)

json.favorites do
  favorites = current_user.favorites.by_message_id(parents)
  json.array! favorites, :id, :message_id, :message_slug
end