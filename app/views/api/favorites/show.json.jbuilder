json.(@favorite, :id, :message_id, :user_id)
json.message_slug @favorite.message.slug
json.user_slug current_user.slug