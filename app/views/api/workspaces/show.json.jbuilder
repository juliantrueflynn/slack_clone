json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.extract! channel, :id, :title, :slug
    json.isSubbed current_user.is_channel_sub?(channel)
  end
end