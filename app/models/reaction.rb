class Reaction < ApplicationRecord
  validates :message_id, :user_id, :emoji, presence: true

  belongs_to :user
  belongs_to :message

  after_create_commit do
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "REACTION_CREATE_RECEIVE", reaction: self)
  end

  after_update_commit do
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "REACTION_UPDATE_RECEIVE", reaction: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_reaction
  def delete_reaction
    channel = message.channel
    ChannelJob.perform_later(channel.slug, type: "REACTION_DELETE_RECEIVE", reaction: self)
  end
end
