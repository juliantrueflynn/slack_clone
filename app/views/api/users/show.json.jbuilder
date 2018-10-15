json.(@user, :id, :slug, :username, :email)
json.avatar_banner @user.avatar.banner.url
json.avatar_thumb @user.avatar.thumb.url
json.avatar_large @user.avatar.large.url

workspace = Workspace.find_by(slug: params[:workspace_slug])
workspace_sub = workspace.subs.find_by(user_id: @user.id)

json.joined_at workspace_sub.created_at

if @user.id != current_user.id
  json.channels do
    channels = @user.channels.dm_chat_by_workspace_id(workspace.id)

    json.array! channels.pluck(:slug)
  end

  dm_chat = current_user.find_dm_chat_with_user(workspace.id, @user.id)
  json.dm_chat dm_chat ? dm_chat.slug : nil
end