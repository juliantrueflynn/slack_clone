json.array! @user_threads do |user_thread|
  json.(user_thread, :id, :body, :author_id, :parent_message_id, :created_at)
  json.parent_message_slug user_thread.parent_message.slug
end