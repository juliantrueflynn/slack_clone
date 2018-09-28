json.favorites do
  @favorites.joins(:message).each do |favorite|
    json.set! favorite.id do
      json.(favorite, *favorite.attributes.keys)
      json.message_slug favorite.message.slug
    end
  end
end

json.messages do
  @favorites.joins(:message).each do |favorite|
    message = favorite.message

    json.set! message.slug do
      json.(message, *message.attributes.keys)
    end
  end
end