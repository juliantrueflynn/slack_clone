json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.(channel, :id, :title, :slug)
    json.isSubbed current_user.is_channel_sub?(channel)
  end
end

json.members do
  json.array! @workspace.members, :id, :username, :email, :slug
end