@workspaces.each do |workspace|
  json.set! workspace.id do
    json.title workspace.title
    json.slug workspace.slug
    json.ownerId workspace.owner_id
  end
end