json.channel do
  json.(@channel, :id, :title, :slug, :topic, :owner_id, :workspace_id)
  json.is_subbed current_user.is_channel_sub?(@channel)
end

json.messages do
  json.array! @channel.messages do |message|
    json.(message, :id, :body, :slug, :author_id, :channel_id, :parent_message_id, :created_at, :updated_at)
    json.author_slug message.author.slug
    if message.is_child?
      json.parent_message_slug message.parent_message.slug
      json.last_read nil
      json.last_active nil
    else
      json.parent_message_slug nil
      read = message.reads.find_by(user_id: current_user.id)
      json.last_read read ? read.accessed_at : nil
      # TODO: Calculate last_active on client side instead of here?
      json.last_active message.replies.last.created_at unless message.replies.empty?
    end
  end
end

json.favorites do
  json.array! @channel.favorites.where(user_id: current_user.id) do |fav|
    json.(fav, :id, :message_id, :user_id)
    json.message_slug fav.message.slug
  end
end

json.reactions do
  json.array! @channel.reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
  end
end

json.members do
  json.array! @channel.members.pluck(:slug)
end