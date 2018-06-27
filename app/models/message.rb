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
  has_many :message_threads, foreign_key: :thread_id, dependent: :destroy
  has_many :children, through: :message_threads, source: :child_message
  has_one :parent, class_name: 'MessageThread', foreign_key: :message_id
  has_one :parent_message, through: :parent

  def self.includes_children
    unscope(where: :author_id).includes(:children)
  end

  def self.with_children
    Message.includes_children.where.not(message_threads: { id: nil })
  end

  def is_child?
    !parent.nil?
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
    ChannelJob.perform_later(channel.slug, type: 'MESSAGE_CREATE_RECEIVE', message: self)
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