json.message do
  json.(@message, :id, :body, :slug, :author_id, :channel_id, :parent_message_id)
end

json.thread do
  json.array! @message.thread_entries do |entry|
    json.(entry, :id, :body, :slug, :channel_id, :author_id, :created_at, :parent_message_id)
  end
end

json.favorites do
    json.array! @message.favs do |fav|
      json.(fav, :id, :message_id, :user_id)
      json.message_slug @message.slug
    end

  @message.thread_entries.each do |message|
    json.array! message.favs do |fav|
      json.(fav, :id, :message_id, :user_id)
      json.message_slug message.slug
    end
  end
end