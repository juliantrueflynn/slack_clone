class ChannelSub < ApplicationRecord
  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel

  after_create_commit do
    ChannelSubEventsJob.perform_later(type: "CHANNEL_SUB_CREATE_RECEIVE", channel_sub: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    ChannelSubEventsJob.perform_later(type: "CHANNEL_SUB_DELETE_RECEIVE", channel_sub: self)
  end
end
