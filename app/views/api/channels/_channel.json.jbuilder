json.(channel, *channel.attributes.keys)
json.ownerSlug channel.owner.slug unless channel.has_dm
json.workspace_slug channel.workspace.slug