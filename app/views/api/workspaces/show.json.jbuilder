json.workspace do
  json.(@workspace, :id, :title, :slug)
end

json.channels do
  channels = @workspace.channels.without_user_and_dm(current_user.id)

  json.array! channels.includes(:owner) do |channel|
    json.(channel, :id, :slug, :title, :has_dm, :owner_slug, :created_at)
  end
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
  user_appearances = @workspace.user_appearances.includes(:user)

  json.array! user_appearances, :status, :user_slug
end

json.channel_subs do
  channel_subs = @workspace.channel_subs.shared_with_user_id(current_user.id)

  json.array! channel_subs.includes(:channel, :user) do |channel_sub|
    json.(channel_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug channel_sub.user.slug
    json.channel_slug channel_sub.channel.slug
  end
end

json.workspace_subs do
  json.array! @workspace.workspace_subs.includes(:user) do |workspace_sub|
    json.(workspace_sub, *workspace_sub.attributes.keys)
    json.user_slug workspace_sub.user.slug
    json.workspace_slug @workspace.slug
  end
end

json.messages do
  json.array! @workspace.user_convos(current_user.id).with_parent do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end

  messages = @workspace.latest_entries(current_user.id)

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
    json.(read, :id, :accessed_at, :readable_id, :readable_type)
    json.slug read.channel.slug
  end

  json.array! read_convos.includes(:message) do |read|
    json.(read, :id, :accessed_at, :readable_id, :readable_type)
    json.slug read.message.slug
  end
end
