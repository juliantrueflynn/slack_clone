json.messages do
  json.array! @messages do |message|
    json.(message, *message.attributes.keys)
    json.author_slug message.author.slug
    json.channel_slug message.channel.slug
  end
end

json.channels do
  channel_ids = @messages.pluck(:channel_id)
  channels = Channel.where(id: channel_ids)
  workspace_slug = params[:workspace_slug]

  json.array! channels do |channel|
    json.(channel, :id, :slug, :title, :workspace_id)
    json.workspace_slug workspace_slug
  end
end

json.reactions do
  reactions = Reaction.by_message_id(@messages)

  json.array! reactions do |reaction|
    json.(reaction, :id, :message_id, :user_id, :emoji)
    json.message_slug reaction.message.slug
    json.user_slug reaction.user.slug
  end
end
