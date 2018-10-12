json.(@user, :id, :slug, :username, :email, :avatar_url)

if @user.id != current_user.id
  workspace = Workspace.find_by(slug: params[:workspace_slug])

  json.channels do
    channels = @user.channels.dm_chat_by_workspace_id(workspace.id)

    json.array! channels.pluck(:slug)
  end

  dm_chat = current_user.find_dm_chat_with_user(workspace.id, @user.id)
  json.dm_chat dm_chat ? dm_chat.slug : nil
end