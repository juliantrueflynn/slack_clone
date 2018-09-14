json.workspace do
  json.(@workspace, :id, :title, :slug, :owner_id)
end

json.channels do
  json.array! current_user.channels.where(workspace_id: @workspace.id) do |chat|
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
  json.array! @workspace.chat_subs.with_user_id(current_user.id) do |chat_sub|
    json.(chat_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug chat_sub.user_slug
    json.channel_slug chat_sub.channel_slug
  end
end

json.reads do
  json.array! current_user.reads.where(workspace_id: @workspace.id) do |read|
    json.(read, :id, :accessed_at, :readable_id, :readable_type, :updated_at)
    entity = read.readable_type.constantize.find_by(id: read.readable_id)
    json.slug entity ? entity.slug : nil
  end
end

json.unreads do
  json.array! Unread.channels_by_workspace_id_and_user_id(@workspace.id, current_user.id) do |unread|
    json.(unread, :id, :active_at, :unreadable_id, :unreadable_type)
    json.slug unread.channel.slug
  end

  json.array! Unread.threads_by_workspace_id_and_user_id(@workspace.id, current_user.id) do |unread|
    json.(unread, :id, :active_at, :unreadable_id, :unreadable_type)
    json.slug unread.message.slug
  end
end
