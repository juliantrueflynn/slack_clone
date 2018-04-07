json.array! @channels do |channel|
  json.set! channel.id do
    json.title channel.title
    json.topic channel.topic
    json.ownerId channel.owner_id
    json.workspaceId channel.workspace_id
  end
end