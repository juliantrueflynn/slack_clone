json.channel do
  json.(channel, :id, :slug, :title, :owner_slug, :owner_id, :has_dm, :created_at)
  json.workspace_slug channel.workspace.slug
end

json.channel_subs do
  channel_subs = channel.subs.includes(:user)

  json.array! channel_subs do |channel_sub|
    json.(channel_sub, :id, :channel_id, :in_sidebar, :user_id)
    json.user_slug channel_sub.user.slug
    json.channel_slug channel.slug
  end
end

json.members channel.has_dm ? channel.members.pluck(:slug) : []