json.chatroom do
  json.(chatroom, :id, :slug, :title, :owner_slug, :owner_id, :has_dm, :created_at)
  json.workspace_slug chatroom.workspace.slug
end

json.chatroom_subs do
  chatroom_subs = chatroom.subs.includes(:user)

  json.array! chatroom_subs do |chatroom_sub|
    json.(chatroom_sub, :id, :chatroom_id, :in_sidebar, :user_id)
    json.user_slug chatroom_sub.user.slug
    json.chatroom_slug chatroom.slug
  end
end

json.members chatroom.has_dm ? chatroom.members.pluck(:slug) : []