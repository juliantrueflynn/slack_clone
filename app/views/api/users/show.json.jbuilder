json.(@user, :id, :slug, :username, :email)

if @user.id != current_user.id
  workspace = Workspace.find_by(slug: params[:workspace_slug])
  json.channels do
    json.array! @user.channels.where(has_dm: false, workspace_id: workspace.id).pluck(:slug)
  end

  dm_chat_with = @user.dm_chat_with_user_id(current_user.id)
  json.dmChat dm_chat_with ? dm_chat_with.slug : nil
end