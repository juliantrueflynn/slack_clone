json.user do
  json.(workspace_sub.user, :id, :slug, :email, :username)
  json.avatar_banner workspace_sub.user.avatar.banner.url
  json.avatar_thumb workspace_sub.user.avatar.thumb.url
  json.avatar_large workspace_sub.user.avatar.large.url
end

json.workspace_sub do
  json.(workspace_sub, :id, :workspace_id, :is_member)
  json.workspace_slug workspace_sub.workspace.slug
end

json.channel_subs do
  json.array! workspace_sub.user.channel_subs do |channel_sub|
    json.(channel_sub, :id, :channel_id, :created_at)
    json.channel_slug channel_sub.channel.slug
  end
end