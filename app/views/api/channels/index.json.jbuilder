json.workspace_slug @channels.first ? @channels.first.workspace.slug : nil

json.channels do
  json.array! @channels, :slug, :owner_id, :owner_slug, :topic, :created_at
end