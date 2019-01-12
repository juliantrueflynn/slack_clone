json.array! @chatrooms do |chatroom|
  json.(chatroom, :slug, :owner_id, :owner_slug, :topic, :created_at)
  json.workspace_slug params[:workspace_slug]
end