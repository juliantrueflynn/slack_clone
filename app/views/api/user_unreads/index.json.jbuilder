@reads.each do |read|
  channel = read.channel
  reads = channel.messages.includes(:author, :parent_message).with_entry_type

  json.array! reads.created_until(read.accessed_at) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.is_child? ? message.parent_message.slug : nil
    json.channel_slug channel.slug
  end
end