json.(message, *message.attributes.keys)
json.parent_message_slug message.parent_message.slug if message.is_child?
json.author_slug message.author.slug
json.channel_slug message.channel.slug