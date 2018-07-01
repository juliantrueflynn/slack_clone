json.parent_messages do
  json.array! @user_threads do |parent|
    json.(parent, :id, :slug, :body, :author_id, :parent_message_id, :channel_id, :created_at)
    json.author_slug parent.author.slug
  end
end

@user_threads.each do |parent|
  parent.replies.each do |reply|
    json.childMessages do
      json.array! parent.replies do |child|
        json.(child, :id, :slug, :body, :author_id, :channel_id, :parent_message_id, :created_at)
        json.parent_message_slug parent.slug
        json.author_slug child.author.slug
      end
    end

    json.favorites do
      json.array! reply.favorites do |fav|
        json.(fav, :id, :message_id, :user_id)
        json.message_slug reply.slug
      end
    end

    json.reactions do
      json.array! reply.reactions do |reaction|
        json.(reaction, :id, :message_id, :user_id, :emoji)
        json.message_slug reply.slug
      end
    end
  end
end