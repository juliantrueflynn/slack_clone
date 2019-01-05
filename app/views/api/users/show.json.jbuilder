json.(@user, :id, :slug, :username, :email)
json.avatar_banner @user.avatar.banner.url
json.avatar_thumb @user.avatar.thumb.url
json.avatar_large @user.avatar.large.url

workspace = Workspace.find_by(slug: params[:workspace_slug])
workspace_sub = workspace.workspace_subs.find_by(user_id: @user.id)

json.joined_at workspace_sub.created_at

unless @user.id === current_user.id
  json.channels do
    channels = @user.channels.with_dm.by_workspace_id(workspace.id)
    json.array! channels.pluck(:slug)
  end

  user_ids = [@user.id, current_user.id]
  dm_chat = workspace.channels.with_dm.by_user_ids(user_ids)
  json.dm_chat dm_chat ? dm_chat.slug : nil
end