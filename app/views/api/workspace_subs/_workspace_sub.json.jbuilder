json.user do
  json.(workspace_sub.user, :id, :slug, :email, :username)
  json.avatar_banner workspace_sub.user.avatar.banner.url
  json.avatar_thumb workspace_sub.user.avatar.thumb.url
  json.avatar_large workspace_sub.user.avatar.large.url
end

json.workspace_sub do
  json.(workspace_sub, :id, :workspace_id, :is_member, :workspace_slug)
end

json.channel_subs do
  user = workspace_sub.user
  workspace_id = workspace_sub.workspace_id
  channel_subs = user.channel_subs.by_workspace_id(workspace_id)

  json.array! channel_subs, :id, :channel_id, :channel_slug, :created_at
end