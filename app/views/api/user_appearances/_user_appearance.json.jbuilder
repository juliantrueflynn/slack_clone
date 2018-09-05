json.status status || user_appearance.status 
json.user_slug user_appearance.user.slug
json.(user_appearance, :created_at, :updated_at)