json.array! @favorites do |fav|
  json.(fav, :id, :message_id, :user_id)
  json.message_slug fav.message.slug
end