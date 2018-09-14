json.workspaces do
  json.array! @workspaces do |workspace|
    json.(workspace, :id, :title, :slug, :owner_id)
    json.owner_slug workspace.owner ? workspace.owner.slug : nil
  end
end

json.workspace_subs do
  json.array! current_user.workspace_subs do |workspace_sub|
    json.(workspace_sub, :id, :workspace_id, :user_id)
    json.user_slug current_user.slug
    json.workspace_slug workspace_sub.workspace.slug
  end
end