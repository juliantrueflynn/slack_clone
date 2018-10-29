json.channel do
  json.(@channel, :owner_slug, *@channel.attributes.keys)
end

json.workspace_slug @channel.workspace.slug
json.pins do
  pins = @channel.pins.includes(:user, :message)

  json.array! pins do |pin|
    json.(pin, :message_slug, :user_slug, *pin.attributes.keys)
  end
end