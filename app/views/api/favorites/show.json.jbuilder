json.(@message_fav, :id, :message_id, :user_id)
json.message_slug @message_fav.message.slug
json.user_slug current_user.slug