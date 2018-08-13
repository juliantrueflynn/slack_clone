json.(dm_chat, *dm_chat.attributes.keys)
json.member_slugs dm_chat.members.pluck(:slug)
json.workspace_slug dm_chat.workspace ? dm_chat.workspace.slug : nil