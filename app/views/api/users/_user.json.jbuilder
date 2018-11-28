json.(user, :id, :slug, :username, :email)
json.avatar_banner user.avatar.banner.url
json.avatar_thumb user.avatar.thumb.url
json.avatar_large user.avatar.large.url
