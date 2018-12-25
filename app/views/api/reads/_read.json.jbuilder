json.(read, :id, :slug, :readable_id, :readable_type, :accessed_at, :user_id)
json.user_slug read.user.slug

if read.readable_type === 'Message'
  json.last_active read.message.children.last.created_at
end