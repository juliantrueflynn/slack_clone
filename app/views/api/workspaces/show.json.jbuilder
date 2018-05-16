json.workspace do
  json.(@workspace, :id, :title, :slug)
  json.owner_id User.find_by(id: @workspace.owner_id).slug
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.(channel, :id, :title, :slug)
    json.isSubbed current_user.is_channel_sub?(channel)
  end
end