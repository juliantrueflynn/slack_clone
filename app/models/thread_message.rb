class ThreadMessage < ApplicationRecord
  before_validation :generate_slug

  validates_presence_of :body, :slug, :author_id, :parent_message_id
  validates_uniqueness_of :slug

  belongs_to :parent_message, class_name: 'Message'
  belongs_to :author, class_name: 'User'
  has_one :channel, through: :message, source: :channel
  has_many :favorites, as: :favoriteable, dependent: :destroy
  has_many :reactions, as: :reactionable, dependent: :destroy

  private

  def generate_slug
    return slug if slug
    
    loop do
      self.slug = SecureRandom.urlsafe_base64(8)
      break unless Message.where(slug: slug).exists?
    end
  end

  after_create_commit do
    ChannelJob.perform_later(channel.slug, type: "THREAD_MESSAGE_CREATE_RECEIVE", thread_message: self)
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: "THREAD_MESSAGE_UPDATE_RECEIVE", thread_message: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_thread_message
  def delete_thread_message
    ChannelJob.perform_later(channel.slug, type: "THREAD_MESSAGE_DELETE_RECEIVE", thread_message: self)
  end
end
