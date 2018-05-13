json.set! :channel do
  json.(@channel, :id, :title, :slug, :topic, :owner_id, :workspace_id)
  json.is_subbed current_user.is_channel_sub?(@channel)
end

json.set! :members do
  json.array! @channel.members do |member|
    json.(member, :id, :slug, :username, :email)
  end
end

json.set! :messages do
  json.array! @channel.messages do |message|
    json.(message, :id, :body, :slug, :author_id, :channel_id, :parent_message_slug, :created_at)
    json.thread message.is_parent_message? ? [message.thread_slugs] : nil
  end
end