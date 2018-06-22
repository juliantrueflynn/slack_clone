json.array! @thread_messages do |thread_message|
  json.(thread_message, :id, :body, :author_id, :parent_message_id, :created_at)
  json.parent_message_slug thread_message.parent_message.slug
end