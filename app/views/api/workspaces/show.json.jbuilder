json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.(channel, :id, :title, :slug)
    json.isSubbed channel.is_user_sub?(current_user.id)
  end
end

json.members do
  json.array! @workspace.members do |member|
    json.(member, :id, :username, :email, :slug)
    json.appearance member.appears.in_workspace(@workspace.slug)
  end
end