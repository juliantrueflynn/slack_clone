json.message do
  json.(@message, :id, :body, :slug, :author_id, :channel_id)
  json.author_slug @message.author.slug
end

json.childMessages do
  @message.replies.each do |reply|
    json.array! @message.replies do |child|
      json.(child, :id, :slug, :body, :author_id, :channel_id, :parent_message_id, :created_at)
      json.parent_message_slug @message.slug
      json.author_slug child.author.slug
    end
  end
end

json.favorites do
  json.array! @message.favorites do |favorite|
    json.(favorite, :id, :message_id, :user_id)
    json.message_slug @message.slug
  end

  @message.replies.each do |reply|
    json.array! reply.favorites do |favorite|
      json.(favorite, :id, :message_id, :user_id)
      json.message_slug reply.slug
    end
  end
end

json.reactions do
  json.array! @message.reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug @message.slug
  end

  @message.replies.each do |reply|
    json.array! reply.reactions do |reaction|
      json.(reaction, :id, :message_id, :user_id, :emoji)
      json.message_slug reply.slug
    end
  end
end