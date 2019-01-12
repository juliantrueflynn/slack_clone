json.workspace do
  json.(workspace, :id, :title, :slug)
end

json.owner do
  json.(workspace.owner, :id, :slug, :username, :email)
end

json.chatrooms do
  json.array! workspace.chatrooms, :id, :title, :slug
end

json.chatroom_subs do
  json.array! workspace.chatroom_subs do |chatroom_sub|
    json.(chatroom_sub, :id)
    json.chatroom_slug chatroom_sub.chatroom.slug
  end
end