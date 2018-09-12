json.message do
  json.(@message, :id, :body, :slug, :author_id, :channel_id, :created_at, :updated_at)
  json.author_slug @message.author.slug
  json.channel_slug @message.channel.slug
end

json.childMessages do
  json.array! @message.replies do |reply|
    @message.single_message_replies.each do |child|
      json.(child, :id, :slug, :body, :author_id, :channel_id, :parent_message_id, :created_at, :updated_at)
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

json.read do
  read = current_user.reads.by_message_id(@message.id)
  if read
    json.(read, :id, :readable_id, :readable_type, :accessed_at)
  else
    json.nil!
  end
end