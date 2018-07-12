unread_channel_ids = @user_unreads.pluck(:channel_id)
channels = Channel.where(id: unread_channel_ids)
messages = @user_unreads.group_by(&:channel_id).values.flatten

json.channels do
  json.array! channels.uniq.pluck(:slug)
end

json.messages do
  json.array! messages do |message|
    json.(message, *message.attributes.keys)
    json.channel_slug message.channel.slug
    json.author_slug message.author.slug
  end
end