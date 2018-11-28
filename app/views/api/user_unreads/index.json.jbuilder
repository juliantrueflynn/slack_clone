json.array! @reads do |read|
  channel = read.channel
  parent_entry_messages = channel.messages.with_entry_type.without_children
  messages = parent_entry_messages.includes(:author, :parent_message)

  messages.created_until(read.accessed_at).each do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.is_child? ? message.parent_message.slug : nil
    json.channel_slug channel.slug
  end
end