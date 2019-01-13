json.(@user, :id, :slug, :username, :email)
json.avatar_banner @user.avatar.banner.url
json.avatar_thumb @user.avatar.thumb.url
json.avatar_large @user.avatar.large.url

workspace = Workspace.find_by_slug(params[:workspace_slug])
workspace_sub = workspace.subs.by_user(@user.id)

json.joined_at workspace_sub.created_at

unless @user.id === current_user.id
  json.chatrooms do
    chatrooms = @user.chatrooms.with_dm.with_workspace(workspace)
    json.array! chatrooms.pluck(:slug)
  end

  user_ids = [@user.id, current_user.id]
  dm_chat = workspace.chatrooms.with_dm.with_users(user_ids)
  json.dm_chat dm_chat ? dm_chat.slug : nil
end