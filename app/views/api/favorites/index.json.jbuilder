json.array! @favorites do |favorite|
  json.(favorite, :id, :message_id, :user_id)
  json.message_slug favorite.message.slug
end