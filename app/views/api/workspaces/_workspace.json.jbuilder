json.workspace do
  json.(workspace, :id, :title, :slug)
end

json.owner do
  json.(workspace.owner, :id, :slug, :username, :email)
end

json.channels do
  json.array! workspace.channels, :id, :title, :slug
end

json.channel_subs do
  json.array! workspace.channel_subs do |channel_sub|
    json.(channel_sub, :id)
    json.channel_slug channel_sub.channel.slug
  end
end