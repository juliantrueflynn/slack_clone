json.(favorite, :id, :user_id, :created_at)
json.message_id favorite.favoriteable_id
json.message_slug favorite.favoriteable.slug