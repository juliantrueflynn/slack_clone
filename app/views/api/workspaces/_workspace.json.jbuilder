json.workspace do
  json.(workspace, :id, :title, :slug, :owner_id)
  json.owner_slug workspace.owner.slug
end

json.channels do
  json.array! workspace.channels, :id, :title, :slug
end