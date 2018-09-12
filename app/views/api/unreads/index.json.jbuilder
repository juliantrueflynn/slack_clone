# @unreads.each do |unread|
#   channel = unread.channel
#   json.set! channel.slug do
#     json.array! channel.messages.after_created_at(unread.created_at) do |message|
#       json.(message, *message.attributes.keys)
#       json.author_slug message.author.slug
#       json.parent_message_slug message.is_child? ? message.parent_message.slug : nil
#     end
#   end
# end

json.array! @unreads do |unread|
  channel = unread.channel
  channel.messages.after_created_at(unread.created_at).each do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.parent_message_slug message.is_child? ? message.parent_message.slug : nil
    json.channel_slug channel.slug
  end
end