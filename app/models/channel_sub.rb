class ChannelSub < ApplicationRecord
  after_create_commit :generate_read

  attr_accessor :skip_broadcast

  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel
  has_one :workspace, through: :channel

  def broadcast_name
    "channel_#{channel.slug}"
  end

  private

  def generate_read
    channel.reads.create!(user_id: user_id, accessed_at: DateTime.now)
  end

  after_create_commit :broadcast_create, unless: :skip_broadcast?
  after_destroy :broadcast_destroy, unless: :skip_broadcast?
end
