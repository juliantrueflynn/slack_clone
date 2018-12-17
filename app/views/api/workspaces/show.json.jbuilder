user_id = current_user.id

json.workspace do
  json.(@workspace, :id, :title, :slug)
end

json.channels do
  channels = @workspace.channels.without_user_and_dm(user_id)
  json.array! channels, :id, :slug, :title, :has_dm
end

json.members do
  json.array! @workspace.users do |member|
    json.(member, :id, :username, :email, :slug)
    json.avatar_banner member.avatar.banner.url
    json.avatar_thumb member.avatar.thumb.url
    json.avatar_large member.avatar.large.url
  end
end

json.user_appearances do
  json.array! @workspace.user_appearances, :status, :user_slug
end

json.channel_subs do
  channel_subs = @workspace.chat_subs.shared_with_user_id(user_id)

  json.array! channel_subs do |chat_sub|
    json.(chat_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug chat_sub.user_slug
    json.channel_slug chat_sub.channel_slug
  end
end

json.workspace_subs do
  json.array! @workspace.subs.includes(:user) do |workspace_sub|
    json.(workspace_sub, *workspace_sub.attributes.keys)
    json.user_slug workspace_sub.user.slug
    json.workspace_slug @workspace.slug
  end
end

json.messages do
  json.array! @workspace.user_convos(user_id).with_parent do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end

  messages = @workspace.latest_entries(user_id)
  json.array! messages.includes(:author, :channel, :parent_message) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
    json.parent_message_slug message.parent_message_slug
  end
end

json.reads do
  reads = current_user.reads.where(workspace_id: @workspace.id)
  read_chats = reads.where(readable_type: 'Channel')
  read_convos = reads.where(readable_type: 'Message')

  json.array! read_chats.includes(:channel) do |read|
    json.(read, :id, :slug, :accessed_at, :readable_id, :readable_type)
  end

  json.array! read_convos.includes(message: [:author, :channel]) do |read|
    json.(read, :id, :slug, :accessed_at, :readable_id, :readable_type)
  end
end
