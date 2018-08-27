json.(channel_sub, :id, :channel_id, :user_id, :in_sidebar, :created_at)
json.user_slug channel_sub.user.slug
json.channel_slug channel_sub.channel.slug