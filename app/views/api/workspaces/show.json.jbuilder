json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_slug)
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.(channel, :id, :title, :slug)
    json.isSubbed current_user.is_channel_sub?(channel)
  end
end