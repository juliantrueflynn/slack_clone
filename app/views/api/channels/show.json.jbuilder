json.set! :channel do
  json.extract! @channel, :id, :title, :topic
  json.owner_id @channel.owner_id
  json.workspace_id @channel.workspace_id
  json.is_subbed current_user.is_channel_sub?(@channel)
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
    json.author_id message.author_id
    json.channel_id message.channel_id
    json.parent_message_id message.parent_message_id
  end
end