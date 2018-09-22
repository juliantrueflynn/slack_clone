json.message do
  json.(message, *message.attributes.keys)
  json.author_slug message.author.slug
  json.channel_slug message.channel.slug
  json.parent_message_slug message.parent_message.slug if message.is_child?
end

if message.is_child?
  json.unread message.parent_message.unread
else
  json.unread message.channel.unread
end