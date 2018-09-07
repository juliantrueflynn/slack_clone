json.(@read, :id, :readable_id, :readable_type, :accessed_at, :user_id)
entity = @read.readable_type.constantize
entity_obj = entity.find_by(id: @read.readable_id)
json.slug entity_obj.slug
json.user_slug @read.user.slug