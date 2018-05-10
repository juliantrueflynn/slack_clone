@workspaces.each do |workspace|
  json.set! workspace.slug do
    json.(workspace, :id, :title, :slug)
  end
end