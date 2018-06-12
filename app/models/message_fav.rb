class MessageFav < ApplicationRecord
  validates_presence_of :message_id, :user_id
  validates_uniqueness_of :message_id, scope: :user_id

  belongs_to :message
  belongs_to :user

  def render_json
    partial = ApplicationController.render partial: 'api/message_favs/favorite',
      locals: {favorite: self}
    JSON.parse(partial)
  end

  after_create_commit do
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_CREATE_RECEIVE", favorite: render_json)
  end

  after_update_commit do
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_UPDATE_RECEIVE", favorite: render_json)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_favorite
  def delete_favorite
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "FAVORITE_DELETE_RECEIVE", favorite: render_json)
  end
end
