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
  has_one :unread,
    -> { where(unreadable_type: 'Message') },
    foreign_key: :unreadable_id,
    dependent: :delete

  scope :exclude_children, -> { where(parent_message_id: nil) }

  def self.parents_with_child_by_author(workspace_id, user_id)
    left_outer_joins(:replies, :workspace)
      .where.not(messages: { parent_message_id: nil })
      .where(workspaces: { id: workspace_id })
      .where(author_id: user_id)
  end

  def self.parents_by_author(workspace_id, user_id)
    left_outer_joins(:replies, :workspace)
      .where(messages: { parent_message_id: nil, author_id: user_id })
      .where(workspaces: { id: workspace_id })
  end

  def self.convos_by_workspace_and_user(workspace_id, user_id)
    children = Message.parents_with_child_by_author(workspace_id, user_id)
    childs_parents = Message.where(id: children.pluck(:parent_message_id).uniq)
    convos = parents_by_author(workspace_id, user_id) + childs_parents
    convos.uniq
  end

  def self.convo_ids_by_workspace_and_user(workspace_id, user_id)
    convos_by_workspace_and_user(workspace_id, user_id).pluck(:id)
  end

  def broadcast_name
    "channel_#{channel.slug}"
  end

  def is_child?
    !!parent_message_id
  end

  def replies_author_slugs
    Message.includes(:author).where(parent_message_id: parent_message_id).pluck('users.slug').uniq
  end

  after_create_commit :broadcast_create
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy
end