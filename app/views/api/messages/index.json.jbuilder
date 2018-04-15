@messages.each do |message|
  json.set! message.id do
    json.(message, :id, :body, :author_id, :channel_id, :parent_message_id)
  end
end