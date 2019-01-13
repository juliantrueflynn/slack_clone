last_message_id = params[:last_id]
messages = @chatroom.older_messages(last_message_id)

json.chatroom do
  json.(@chatroom, :slug, :owner_slug, :topic, :created_at, :earliest_message_slug)
end

json.messages do
  json.array! messages.includes(:parent_message, :author) do |message|
    json.(message, :parent_message_slug, *message.attributes.keys)
    json.author_slug message.author.slug
  end
end

parents = messages.with_parent

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

unless last_message_id
  json.pins do
    pins = @chatroom.pins.includes(:message, :user)
  
    json.array! pins, :id, :user_id, :message_id, :message_slug, :user_slug
  end

  json.members @chatroom.users.pluck(:slug)
end
