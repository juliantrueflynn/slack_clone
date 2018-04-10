@workspaces.each do |workspace|
  json.set! workspace.id do
    json.id workspace.id
    json.title workspace.title
    json.slug workspace.slug
  end
end