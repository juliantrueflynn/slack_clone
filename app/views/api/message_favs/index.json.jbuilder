@message_favs.each do |fav|
  json.set! fav.message.slug do
    json.(fav, :id, :message_id, :user_id)
    json.message_slug fav.message.slug
  end
end