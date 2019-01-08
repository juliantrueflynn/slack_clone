json.array! @channels do |channel|
  json.(channel, :slug, :owner_id, :owner_slug, :topic, :created_at)
  json.workspace_slug params[:workspace_slug]
end