@messages.each do |message|
  json.set! message.slug do
    json.(message, :id, :body, :slug, :author_id, :channel_id, :parent_message_slug, :created_at)
  end
end