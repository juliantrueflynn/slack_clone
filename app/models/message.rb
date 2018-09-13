class Message < ApplicationRecord
  before_validation :generate_slug, unless: :slug?

  attr_accessor :skip_broadcast

  validates_presence_of :slug, :author_id, :channel_id
  validates_uniqueness_of :slug
  validates_length_of :body,
    within: 1..50000,
    too_long: 'is too long (max: 50000 characters)',
    too_short: 'cannot be empty'

  belongs_to :channel
  belongs_to :author, class_name: 'User'
  belongs_to :parent_message,
    class_name: 'Message',
    optional: true
  has_one :workspace, through: :channel
  has_many :single_message_replies,
    -> { includes(:author, :favorites) },
    class_name: 'Message',
    foreign_key: :parent_message_id
  has_many :replies,
    -> { includes(:reactions) },
    class_name: 'Message',
    foreign_key: :parent_message_id
  has_many :thread_replies,
    through: :replies,
    source: :parent_message
  has_many :authors,
    through: :replies,
    source: :author
  has_many :favorites
  has_many :reactions
  has_many :reads, foreign_key: :readable_id
  has_one :unread, foreign_key: :unreadable_id, dependent: :delete

  scope :exclude_children, -> { where(parent_message_id: nil) }
  scope :with_thread_replies, -> { includes(thread_replies: [:author, :replies]).where.not(thread_replies_messages: { id: nil }) }

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
    Message.parents_with_author_id(author_id).or(Message.children_with_author_id(author_id))
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  def is_child?
    !!parent_message_id
  end

  after_create_commit :broadcast_create
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy
end