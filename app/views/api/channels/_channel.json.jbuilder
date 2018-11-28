json.channel do
  json.(channel, :id, :slug, :title, :owner_slug, :owner_id, :has_dm, :created_at)
end

json.workspace_slug channel.workspace.slug

json.subs do
  json.array! channel.subs do |chat_sub|
    json.(chat_sub, :id, :channel_id, :in_sidebar, :user_id)
    json.user_slug chat_sub.user.slug
    json.channel_slug channel.slug
  end
end

json.members channel.has_dm ? channel.members.pluck(:slug) : []