json.message do
  json.(@message, :id, :body, :slug, :author_id, :channel_id)
end

json.thread do
  json.array! @message.children, :id, :body, :slug, :channel_id, :author_id, :created_at
end

json.favorites do
  json.array! @message.favorites do |fav|
    json.(fav, :id, :message_id, :user_id)
    json.message_slug @message.slug
  end

  @message.children.each do |message|
    json.array! message.favorites do |fav|
      json.(fav, :id, :message_id, :user_id)
      json.message_slug message.slug
    end
  end
end

json.reactions do
  json.array! @message.reactions, :id, :message_id, :user_id, :emoji
end