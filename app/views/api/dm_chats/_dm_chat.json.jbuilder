json.channel do
  json.(dm_chat, *dm_chat.attributes.keys)
  json.workspace_slug dm_chat.workspace.slug
end

json.members dm_chat.members.pluck(:slug)

json.subs do
  json.array! dm_chat.subs do |chat_sub|
    json.(chat_sub, :id, :in_sidebar, :user_id)
    json.user_slug chat_sub.user.slug
    json.channel_slug dm_chat.slug
  end
end

json.reads do
  json.array! dm_chat.reads do |read|
    json.(read, :id, :readable_id, :accessed_at, :user_id)
    json.slug read.channel.slug
    json.user_slug read.user.slug
  end
end