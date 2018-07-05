class Reaction < ApplicationRecord
  validates :message_id, :user_id, :emoji, presence: true

  belongs_to :user
  belongs_to :message

  private

  def channel
    message.channel
  end

  after_create_commit do
    ChannelJob.perform_later(
      channel.slug,
      type: "REACTION_CREATE_RECEIVE",
      reaction: self,
      message_slug: message.slug
    )
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: "REACTION_UPDATE_RECEIVE", reaction: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_reaction
  def delete_reaction
    ChannelJob.perform_later(channel.slug, type: "REACTION_DELETE_RECEIVE", reaction: self)
  end
end
