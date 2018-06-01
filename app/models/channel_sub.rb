class ChannelSub < ApplicationRecord
  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel

  after_create_commit do
    ChannelSubEventsJob.perform_later(event: "CREATE_CHANNEL_SUB", sub: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    ChannelSubEventsJob.perform_later(event: "DELETE_CHANNEL_SUB", sub: self)
  end
end
