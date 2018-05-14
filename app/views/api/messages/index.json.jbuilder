@messages.each do |message|
  json.set! message.slug do
    json.(message, :id, :body, :slug, :author_slug, :channel_slug, :parent_message_slug, :created_at)
  end
end