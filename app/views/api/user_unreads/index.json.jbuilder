@reads.each do |read|
  channel = read.channel

  json.array! channel.messages.after_created_at(read.accessed_at) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.is_child? ? message.parent_message.slug : nil
    json.channel_slug channel.slug
  end
end