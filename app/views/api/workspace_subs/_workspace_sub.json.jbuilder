json.workspace_sub do
  json.(workspace_sub, :id, :user_id, :workspace_id)
  json.user_slug workspace_sub.user.slug
  json.workspace_slug workspace_sub.workspace.slug
end

json.channel_subs do
  json.array! workspace_sub.user.channel_subs do |channel_sub|
    json.(channel_sub, :id, :channel_id, :created_at)
    json.channel_slug channel_sub.channel.slug
  end
end