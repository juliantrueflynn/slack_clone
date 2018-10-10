class Message < ApplicationRecord
  before_validation :generate_slug, unless: :slug?

  attr_accessor :skip_broadcast
  attr_accessor :parent_mesage_slug

  validates_presence_of :slug, :author_id, :entity_type, :channel_id
  validates_uniqueness_of :slug
  validates_length_of :body,
    maximum: 50000,
    too_long: 'is too long (max: 50000 characters)'
  validates_inclusion_of :entity_type, in: %w(entry sub_create sub_destroy)

  belongs_to :channel
  belongs_to :author, class_name: 'User'
  belongs_to :parent_message,
    class_name: 'Message',
    optional: true
  has_one :workspace, through: :channel
  has_many :replies,
    -> { includes(:author, :parent_message) },
    class_name: 'Message',
    foreign_key: :parent_message_id
  has_many :authors,
    through: :replies,
    source: :author
  has_many :favorites
  has_many :reactions,
    -> { joins(:user).select('reactions.*', 'users.slug AS user_slug') }
  has_many :reads, foreign_key: :readable_id
  has_one :unread,
    -> { where(unreadable_type: 'Message') },
    foreign_key: :unreadable_id,
    dependent: :delete

  scope :without_children, -> { where(parent_message_id: nil) }
  scope :with_entry_type, -> { where(entity_type: 'entry') }
  scope :without_entry_type, -> { where.not(entity_type: 'entry') }

  def self.parent_ids_with_child_by_author(workspace_id, user_id)
    left_outer_joins(:replies, :workspace)
      .where.not(messages: { parent_message_id: nil })
      .where(workspaces: { id: workspace_id })
      .where(author_id: user_id)
      .pluck(:parent_message_id)
  end

  def self.parent_ids_by_author(workspace_id, user_id)
    left_outer_joins(:replies, :workspace)
      .where.not(replies_messages: { parent_message_id: nil })
      .where(workspaces: { id: workspace_id })
      .where(author_id: user_id)
      .pluck(:id)
  end

  def self.convo_ids_by_workspace_and_user(workspace_id, user_id)
    child_ids = parent_ids_with_child_by_author(workspace_id, user_id)
    parent_ids = parent_ids_by_author(workspace_id, user_id)
    (parent_ids + child_ids).uniq
  end

  def self.convos_by_workspace_with_user(workspace_id, user_id)
    convos = convo_ids_by_workspace_and_user(workspace_id, user_id)
    where(id: convos).or(where(parent_message_id: convos))
  end

  def self.convo_parents_by_workspace_with_user(workspace_id, user_id)
    convos = convo_ids_by_workspace_and_user(workspace_id, user_id)
    where(id: convos)
  end

  def self.created_between(start_date, end_date)
    where("created_at BETWEEN ? AND ?", start_date, end_date)
  end

  def self.created_until(until_date)
    where("created_at > ?", until_date)
  end

  def self.first_parent_created_at(channel_id)
    entries = without_children.where(channel_id: channel_id)
    entries.first ? entries.first.created_at : nil
  end

  def self.days_from_first_post(channel_id, compared_date)
    last_created = first_parent_created_at(channel_id)
    return 1 if last_created.nil?
    (compared_date.to_date - last_created.midnight.to_date).to_i
  end

  def self.parents_or_children(id_or_ids)
    where(id: id_or_ids).or(where(parent_message_id: id_or_ids))
  end

  def self.created_recently(channel_id, start_date)
    end_date = start_date.midnight
    days_between = days_from_first_post(channel_id, start_date) + 1
    entries = where(channel_id: channel_id).without_children

    results = []
    1.step(to: days_between) do |idx|
      new_end_date = end_date - idx
      results = entries.created_between(new_end_date, start_date)
      break if results.length >= 12
    end

    parents_or_children(results)
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