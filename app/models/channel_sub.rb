class ChannelSub < ApplicationRecord
  belongs_to :user,
    primary_key: :slug,
    foreign_key: :user_slug
  belongs_to :channel,
    primary_key: :slug,
    foreign_key: :channel_slug
end
