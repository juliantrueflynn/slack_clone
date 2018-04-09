json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels, :id, :title, :topic, :owner_id 
end