json.(chatroom_sub, :id, :chatroom_id, :user_id, :in_sidebar, :created_at)
json.user_slug chatroom_sub.user.slug
json.chatroom_slug chatroom_sub.chatroom.slug