json.set! :channel do
  json.extract! @channel, :id, :title, :topic
  json.ownerId @channel.owner_id
  json.workspaceId @channel.workspace_id
  json.isSubbed current_user.is_channel_sub?(@channel)
end

json.set! :members do
  json.array! @channel.members do |member|
    json.id member.id
    json.username member.username
    json.email member.email
  end
end

json.set! :messages do
  json.array! @channel.messages do |message|
    json.id message.id
    json.body message.body
    json.authorId message.author_id
    json.channelId message.channel_id
    json.parentMessageId message.parent_message_id
  end
end