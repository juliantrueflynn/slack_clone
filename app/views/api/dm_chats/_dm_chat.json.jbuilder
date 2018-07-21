json.(dm_chat, *dm_chat.attributes.keys)
json.member_slugs dm_chat.members.pluck(:slug)