json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! @workspace.channels do |chat|
    if chat.has_dm
      next unless chat.subs.exists?(user_id: current_user.id)
    end

    json.(chat, :id, :title, :slug, :has_dm)
  end
end

json.members do
  json.array! @workspace.members do |member|
    json.(member, :id, :username, :email, :slug)
    json.status member.status || 'OFFLINE'
  end
end

json.subs do
  json.array! @workspace.chat_subs do |chat_sub|
    json.(chat_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug chat_sub.user_slug
    json.channel_slug chat_sub.channel_slug
  end
end