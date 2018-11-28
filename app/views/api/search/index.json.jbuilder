json.messages do
  json.array! @messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@messages)
  json.array! reactions, :id, :message_slug
end