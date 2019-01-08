json.workspace do
  json.(@workspace, :id, :title, :slug)
end

json.workspace_subs do
  json.array! @workspace.workspace_subs.includes(:user) do |workspace_sub|
    json.(workspace_sub, *workspace_sub.attributes.keys)
    json.user_slug workspace_sub.user.slug
    json.workspace_slug @workspace.slug
  end
end

json.members do
  json.array! @workspace.members do |member|
    json.(member, :id, :username, :email, :slug)
    json.avatar_banner member.avatar.banner.url
    json.avatar_thumb member.avatar.thumb.url
    json.avatar_large member.avatar.large.url
    json.status member.status
  end
end

last_actives_map = @workspace.last_entries_created_at_map(current_user.id)

json.channels do
  channels = @workspace.channels.without_user_and_dm(current_user.id)

  json.array! channels do |channel|
    json.(channel, :id, :slug, :title, :has_dm)
    json.last_active last_actives_map[channel.slug]
  end
end

json.channel_subs do
  channel_subs = @workspace.channel_subs.shared_with_user_id(current_user.id)

  json.array! channel_subs.includes(:channel, :user) do |channel_sub|
    json.(channel_sub, :id, :user_id, :in_sidebar, :channel_id, :created_at)
    json.user_slug channel_sub.user.slug
    json.channel_slug channel_sub.channel.slug
  end
end

json.reads do
  reads = @workspace.reads.where(user_id: current_user.id)

  json.array! reads.channels.includes(:channel) do |read|
    json.(read, :readable_id, :readable_type)
    json.slug read.channel.slug
    json.last_read read.accessed_at
  end

  json.array! @workspace.user_convos_reads(current_user.id) do |message|
    json.(message, :slug, :last_read)
    json.readable_id message.id
    json.last_active last_actives_map[message.slug]
    json.readable_type 'Message'
  end
end
