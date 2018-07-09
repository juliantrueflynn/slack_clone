json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels do |channel|
    json.(channel, :id, :title, :slug)
    json.last_read current_user.reads.find_by(readable_id: channel.id, readable_type: 'Channel')
    json.last_active channel.last_message_created_date
  end
end

json.members do
  json.array! @workspace.members do |member|
    user_appearance = member.appears.in_workspace(@workspace.slug)
    json.(member, :id, :username, :email, :slug)
    json.appears user_appearance ? user_appearance.status : 'OFFLINE'
  end
end