class Favorite < ApplicationRecord
  validates_presence_of :user_id

  belongs_to :favoriteable, polymorphic: true
  belongs_to :user

  def channel
    favoriteable.channel
  end

  def render_json
    json = ApplicationController.render partial: 'api/favorites/favorite', locals: {favorite: self}
    JSON.parse(json)
  end

  private

  after_create_commit do
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_CREATE_RECEIVE", favorite: render_json)
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_UPDATE_RECEIVE", favorite: render_json)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_favorite
  def delete_favorite
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_DELETE_RECEIVE", favorite: render_json)
  end
end
