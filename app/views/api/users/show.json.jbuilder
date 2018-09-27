json.(@user, :id, :slug, :username, :email)

if @user.id != current_user.id
  workspace = Workspace.find_by(slug: params[:workspace_slug])
  json.channels do
    json.array! @user.channels.where(has_dm: false, workspace_id: workspace.id).pluck(:slug)
  end

  dm_chat = current_user.dm_chat_with_user_in_workspace(@user.id, workspace.id)
  json.dm_chat dm_chat ? dm_chat.slug : nil
end