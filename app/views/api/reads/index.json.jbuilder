@reads.each do |read|
  json.array! read.channel.entries.where("messages.created_at > ?", read.accessed_at) do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug read.channel.slug
  end
end