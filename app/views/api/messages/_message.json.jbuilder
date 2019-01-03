json.message do
  json.(message, *message.attributes.keys)
  json.author_slug message.author.slug
  json.channel_slug message.channel.slug
  json.parent_message_slug message.parent_message_slug
end

json.parent_message do
  if message.parent_message_id?
    json.(message.parent_message, *message.parent_message.attributes.keys)
    json.author_slug message.parent_message.author.slug
    json.channel_slug message.channel.slug
  else
    json.nil!
  end
end