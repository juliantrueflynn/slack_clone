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
  has_many :favorites, dependent: :destroy
  has_many :reactions, dependent: :destroy
  belongs_to :parent_message, class_name: 'Message', optional: true
  has_many :replies,
    -> { includes(:favorites) },
    class_name: 'Message',
    foreign_key: :parent_message_id,
    dependent: :destroy
  has_many :thread_replies, through: :replies, source: :parent_message

  scope :with_thread_replies, -> { includes(:thread_replies, :replies).where.not(thread_replies_messages: { id: nil }) }

  def self.parents_with_author_id(author_id)
    Message.with_thread_replies.where(thread_replies_messages: { author_id: author_id })
  end

  def self.users_parents_ids(author_id)
    Message.select(:parent_message_id).where(author_id: author_id).where.not(parent_message_id: nil)
  end

  def self.children_with_author_id(author_id)
    Message.with_thread_replies.where(id: Message.users_parents_ids(author_id))
  end

  def self.threads_with_author_id(author_id)
    Message.parents_with_author_id(author_id).or(Message.children_with_author_id(author_id)).order(:id)
  end

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
    ChannelJob.perform_later(
      channel.slug,
      type: "MESSAGE_CREATE_RECEIVE",
      message: self,
      parent_message_slug: is_child? ? parent_message.slug : nil
    )
  end

  after_update_commit do
    ChannelJob.perform_later(channel.slug, type: 'MESSAGE_UPDATE_RECEIVE', message: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    ChannelJob.perform_later(channel.slug, type: 'MESSAGE_DELETE_RECEIVE', message: self)
  end
end