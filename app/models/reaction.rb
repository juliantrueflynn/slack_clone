class Reaction < ApplicationRecord
  validates_presence_of :user_id, :emoji

  belongs_to :reactionable, polymorphic: true
  belongs_to :user

  def channel
    reactionable.channel
  end

  def render_json
    json = ApplicationController.render partial: 'api/reactions/reaction', locals: {reaction: self}
    JSON.parse(json)
  end

  private

  after_create_commit do
    ChannelJob.perform_later(channel.slug, type: "REACTION_CREATE_RECEIVE", reaction: render_json)
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: "REACTION_UPDATE_RECEIVE", reaction: render_json)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_reaction
  def delete_reaction
    ChannelJob.perform_later(channel.slug, type: "REACTION_DELETE_RECEIVE", reaction: render_json)
  end
end
