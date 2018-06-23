class Message < ApplicationRecord
  before_validation :generate_slug

  validates_presence_of :slug, :author_id, :channel_id
  validates_uniqueness_of :slug
  validates_length_of :body,
    within: 1..50000,
    too_long: 'is too long (max: 50000 characters)',
    too_short: 'cannot be empty'

  belongs_to :author, class_name: 'User'
  belongs_to :channel
  belongs_to :parent_message, class_name: 'Message', optional: true
  has_many :thread_entries,
    class_name: 'Message',
    foreign_key: :parent_message_id,
    dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :reactions, dependent: :destroy

  def is_child?
    !!parent_message_id
  end

  private

  def generate_slug
    return slug if slug
    
    loop do
      self.slug = SecureRandom.urlsafe_base64(8)
      break unless Message.where(slug: slug).exists?
    end
  end

  after_create_commit do
    parent_message_slug = nil

    if is_child?
      parent_message = Message.find_by(id: parent_message_id)
      parent_message_slug = parent_message.slug
    end

    ChannelJob.perform_later(
      channel.slug,
      type: "MESSAGE_CREATE_RECEIVE",
      message: self,
      parent_message_slug: parent_message_slug
    )
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: "MESSAGE_UPDATE_RECEIVE", message: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    ChannelJob.perform_later(channel.slug, type: "MESSAGE_DELETE_RECEIVE", message: self)
  end
end
