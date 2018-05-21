class ChannelSub < ApplicationRecord
  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel
end
