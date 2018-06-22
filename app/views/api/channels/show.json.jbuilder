json.channel do
  json.(@channel, :id, :title, :slug, :topic, :owner_id, :workspace_id)
  json.is_subbed current_user.is_channel_sub?(@channel)
end

json.members do
  json.array! @channel.members do |member|
    json.(member, :id, :slug, :username, :email, :appearance)
  end
end

json.messages do
  json.array! @channel.messages do |message|
    json.(message, :id, :body, :slug, :author_id, :channel_id, :created_at)
  end
end

json.favorites do
  json.array! @channel.favorites do |favorite|
    json.(favorite, :id, :user_id)
    json.message_id favorite.favoriteable_id
    json.message_slug favorite.favoriteable.slug
  end
end

json.reactions do
  json.array! @channel.reactions do |reaction|
    json.(reaction, :id, :user_id, :emoji)
    json.message_id reaction.reactionable_id
    json.message_slug reaction.reactionable.slug
  end
end