json.(channel, :owner_slug, *channel.attributes.keys)
json.workspace_slug channel.workspace.slug

json.subs do
  json.array! channel.subs do |chat_sub|
    json.(chat_sub, :id, :channel_id, :in_sidebar, :user_id)
    json.user_slug chat_sub.user.slug
    json.channel_slug channel.slug
  end
end

members = channel.has_dm ? channel.members.pluck(:slug) : []
json.members members