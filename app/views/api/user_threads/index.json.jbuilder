@user_threads.each do |parent|
  json.set! parent.slug do
    json.(parent, :id, :slug, :body, :author_id, :channel_id, :parent_message_id, :created_at)

    json.thread do
      parent.replies.each do |reply|
        json.set! reply.slug do
          json.(reply, :id, :slug, :body, :author_id, :channel_id, :parent_message_id, :created_at)
        end
      end
    end
  end
end