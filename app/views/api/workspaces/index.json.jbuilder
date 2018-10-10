json.workspaces do
  json.array! @workspaces.includes(:owner) do |workspace|
    json.(workspace, :id, :title, :slug, :owner_id)
    json.owner_slug workspace.owner.slug
  end
end

json.workspace_subs do
  json.array! current_user.workspace_subs.includes(:workspace) do |workspace_sub|
    json.(workspace_sub, *workspace_sub.attributes.keys)
    json.user_slug current_user.slug
    json.workspace_slug workspace_sub.workspace.slug
  end
end