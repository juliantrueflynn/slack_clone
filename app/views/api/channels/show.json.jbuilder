json.set! :channel do
  json.(@channel, :id, :title, :slug, :topic, :owner_slug, :workspace_slug)
  json.is_subbed current_user.is_channel_sub?(@channel)
end

json.set! :members do
  json.array! @channel.members do |member|
    json.(member, :id, :slug, :username, :email)
  end
end

json.set! :messages do
  json.array! @channel.messages do |message|
    json.(message, :id, :body, :slug, :author_slug, :channel_slug, :parent_message_slug, :created_at)
  end
end