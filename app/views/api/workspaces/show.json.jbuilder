user_id = current_user.id

json.workspace do
  json.(@workspace, :id, :title, :slug)
end

json.channels do
  channels = current_user.channels.where(workspace_id: @workspace.id)

  json.array! channels.includes(:owner) do |chat|
    json.(chat, :id, :title, :slug, :owner_id, :has_dm)
    json.owner_slug chat.owner ? chat.owner.slug : nil
  end
end

json.members do
  json.array! @workspace.members do |member|
    json.(member, :id, :username, :email, :slug)
    json.status member.status || 'OFFLINE'
  end
end

json.channel_subs do
  json.array! @workspace.chat_subs.with_user_id(user_id) do |chat_sub|
    json.(chat_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug chat_sub.user_slug
    json.channel_slug chat_sub.channel_slug
  end
end

json.workspace_subs do
  json.array! @workspace.subs do |workspace_sub|
    json.(workspace_sub, *workspace_sub.attributes.keys)
    json.user_slug workspace_sub.user.slug
    json.workspace_slug @workspace.slug
  end
end

json.messages do  
  json.array! @workspace.convo_parents_with_user_id(user_id) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end
end

json.reads do
  reads = current_user.reads.where(workspace_id: @workspace.id)
  read_chats = reads.where(readable_type: 'Channel')
  read_convos = reads.where(readable_type: 'Message')

  json.array! read_chats.includes(:channel) do |read|
    json.(read, :id, :accessed_at, :readable_id, :readable_type)
    json.slug read.channel.slug
  end

  json.array! read_convos.includes(message: [:author, :channel]) do |read|
    json.(read, :id, :accessed_at, :readable_id, :readable_type)
    json.slug read.message.slug
  end
end

json.unreads do
  unread_chats = Unread.channels_by_workspace_id_and_user_id(@workspace.id, user_id)
  unread_convos = Unread.convos_by_workspace_and_user(@workspace.id, user_id)

  json.array! unread_chats.includes(:channel) do |unread|
    json.(unread, :id, :active_at, :unreadable_id, :unreadable_type)
    json.slug unread.channel.slug
  end

  json.array! unread_convos.includes(:message) do |unread|
    json.(unread, :id, :active_at, :unreadable_id, :unreadable_type)
    json.slug unread.message.slug
  end
end
