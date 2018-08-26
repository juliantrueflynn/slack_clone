json.workspace_slug @channels.first ? @channels.first.workspace.slug : nil

json.channels do
  json.array! @channels do |channel|
    json.(channel, *channel.attributes.keys)
    json.owner_slug channel.owner ? channel.owner.slug : nil
  end
end