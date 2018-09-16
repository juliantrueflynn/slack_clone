json.(unread, :id, :unreadable_id, :unreadable_type)
entity = unread.unreadable_type.constantize.find_by(id: unread.unreadable_id)
json.slug entity.slug