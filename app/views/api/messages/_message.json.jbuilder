json.(message, *message.attributes.keys)
json.author_slug message.author.slug
json.chatroom_slug message.chatroom.slug
json.parent_message_slug message.parent_message_slug

if message.parent_message_id?
  json.authors message.parent_message.convo_authors_slugs
end