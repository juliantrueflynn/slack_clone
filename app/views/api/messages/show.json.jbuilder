json.message do
  json.(@message, :id, :body, :slug, :author_id, :channel_id)
end

json.thread do
  json.array! @message.thread_entries do |entry|
    json.(entry, :id, :body, :slug, :author_id, :created_at, :parent_message_id)
  end
end

json.favorites do
  json.array! @message.favorites do |favorite|
    json.(favorite, :id, :message_id, :user_id)
    json.message_slug @message.slug
  end

  @message.thread_entries.each do |message|
    json.array! message.favorites do |favorite|
      json.(favorite, :id, :message_id, :user_id)
      json.message_slug message.slug
    end
  end
end

json.reactions do
  json.array! @message.reactions, :id, :message_id, :user_id, :emoji
end