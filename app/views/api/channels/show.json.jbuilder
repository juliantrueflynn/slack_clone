json.set! :channel do
  json.extract @channel, :id, :title, :topic
  json.ownerId @channel.owner_id
  json.workspaceId @channel.workspace_id
end

json.set! :members do
  json.array! @channel.members do |member|
    json.id member.id
    json.username member.username
    json.email member.email
  end
end