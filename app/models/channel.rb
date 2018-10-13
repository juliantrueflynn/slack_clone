class Channel < ApplicationRecord
  attr_accessor :skip_broadcast, :member_id
  attr_reader :member_ids

  before_validation :generate_slug, unless: :slug?

  validates_presence_of :slug, :workspace_id
  validates_uniqueness_of :slug
  validates_length_of :title,
    within: 2..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)',
    allow_nil: true

  belongs_to :workspace
  belongs_to :owner,
    class_name: 'User',
    foreign_key: :owner_id,
    optional: true
  has_many :subs, class_name: 'ChannelSub'
  has_many :members,
    class_name: 'User',
    through: :subs,
    source: :user
  has_many :recent_entries,
    class_name: 'Message'
  has_many :entries, class_name: 'Message'
  has_many :messages
  has_many :parent_messages,
    -> { Message.without_children },
    class_name: 'Message'
  has_many :favorites,
    -> { joins(:message).select('favorites.*', 'messages.slug AS message_slug') },
    through: :messages,
    source: :favorites
  has_many :reactions,
    through: :messages,
    source: :reactions
  has_many :reads, foreign_key: :readable_id do
    def find_or_initialize_by_user(user_id)
      find_or_initialize_by(user_id: user_id, readable_type: 'Channel')
    end
  end
  has_one :unread,
    -> { where(unreadable_type: 'Channel') },
    foreign_key: :unreadable_id,
    dependent: :delete

  def self.by_workspace_id(workspace_id)
    where(workspace_id: workspace_id)
  end

  def self.dm_chat_by_workspace_id(workspace_id)
    where(has_dm: true).by_workspace_id(workspace_id)
  end

  def self.find_dm_chat_by_workspace_and_users(workspace_id, users_ids)
    joins(:subs)
      .dm_chat_by_workspace_id(workspace_id)
      .where(channel_subs: { user_id: users_ids })
      .group('channels.id')
      .having('COUNT(channels.id) > 1')
      .take
  end

  def self.with_user_sub(user_id)
    includes(:subs).where(channel_subs: { user_id: user_id })
  end

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def owner_slug
    owner ? owner.slug : nil
  end

  def recent_messages(start_date = nil)
    return messages if messages.without_children.length < 12
    after_date = start_date ? DateTime.parse(start_date) : DateTime.now
    Message.created_recently(id, after_date)
  end

  def previous_messages(end_date)
    return messages if messages.without_children.length < 12
    until_date = DateTime.parse(end_date).midnight
    messages.created_until(until_date)
  end

  def history_messages(until_date = nil)
    return previous_messages(until_date) unless until_date.nil?
    recent_messages
  end

  def member_ids=(member_ids)
    @member_ids = member_ids.map(&:to_i)
  end

  def is_user_sub?(user_id)
    !!subs.find_by(channel_subs: { user_id: user_id })
  end

  after_create :generate_chat_subs
  after_create_commit :generate_unread, :broadcast_create
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy

  private

  def sub_user_to_public_chat
    subs.create(user_id: owner.id, skip_broadcast: true)
  end

  def sub_users_to_dm_chat
    return unless self.member_ids

    self.member_ids.each_with_index do |dm_user_id, idx|
      in_sidebar = idx === 0 ? true : false
      subs.create(
        channel_id: id,
        user_id: dm_user_id,
        in_sidebar: in_sidebar,
        skip_broadcast: true
      )
    end
  end

  def generate_chat_subs
    sub_users_to_dm_chat if has_dm?
    sub_user_to_public_chat if owner
  end

  def generate_unread
    Unread.create(active_at: created_at, unreadable_id: id, unreadable_type: 'Channel')
  end
end
