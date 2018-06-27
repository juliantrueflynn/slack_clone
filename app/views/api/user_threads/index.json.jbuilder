@user_threads.each do |user_thread|
  json.set! user_thread.slug do
    json.(user_thread, :id, :slug, :body, :author_id, :channel_id, :created_at)

    json.thread do
      user_thread.children.each do |child|
        json.set! child.slug do
          json.(child, :id, :slug, :body, :author_id, :channel_id, :created_at)
        end
      end
    end
  end
end