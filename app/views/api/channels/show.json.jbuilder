json.set! :channel do
  json.(@channel, :id, :title, :slug, :topic)
  json.is_subbed current_user.is_channel_sub?(@channel)
  json.owner_id User.find_by(id: @channel.owner_id).slug
  json.workspace_id Workspace.find_by(id: @channel.workspace_id).slug
end

json.set! :members do
  json.array! @channel.members do |member|
    json.(member, :id, :slug, :username, :email)
  end
end

json.set! :messages do
  json.array! @channel.messages do |message|
    json.(message, :id, :body, :slug, :author_id, :created_at)
    json.channel_id Channel.find_by(id: message.channel_id).slug
    json.author_id User.find_by(id: message.author_id).slug
    json.parent_message_id Message.find_by(id: message.parent_message_id)
  end
end