json.messages do
  json.array! @messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.chatroom_slug message.chatroom.slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@messages).includes(:user)
  json.array! reactions, :id, :message_slug
end