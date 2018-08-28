json.(channel, :id, :slug, :title, :owner_id, :topic, :has_dm, :workspace_id, :created_at)
json.ownerSlug channel.owner.slug unless channel.has_dm
json.workspace_slug channel.workspace.slug
json.subs channel.subs