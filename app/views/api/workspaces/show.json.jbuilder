json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! current_user.channels.where(channels: { workspace_id: @workspace.id }) do |chat|
    json.(chat, :id, :title, :slug, :has_dm)

    member_slugs = [current_user.slug]
    member_slugs = chat.members.pluck(:slug) if chat.has_dm?
    json.member_slugs member_slugs
  end
end

json.members do
  json.array! @workspace.members do |member|
    json.(member, :id, :username, :email, :slug)
    json.status member.status || 'OFFLINE'
  end
end