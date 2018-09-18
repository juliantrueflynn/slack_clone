class Channel < ApplicationRecord
  attr_accessor :skip_broadcast, :last_read
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
  has_many :all_messages, class_name: 'Message'
  has_many :entries, class_name: 'Message'
  has_many :messages,
    -> { includes(:parent_message) } do
    def after_created_at(accessed_at)
      where('messages.created_at > ?', accessed_at)
    end
  end
  has_many :parent_messages,
    -> { Message.exclude_children },
    class_name: 'Message'
  has_many :favorites,
    -> { joins(:message).select('favorites.*', 'messages.slug AS message_slug') },
    through: :messages,
    source: :favorites
  has_many :reactions,
    through: :messages,
    source: :reactions
  has_many :reads, foreign_key: :readable_id
  has_one :unread,
    -> { where(unreadable_type: 'Channel') },
    foreign_key: :unreadable_id,
    dependent: :delete

  scope :with_subs, -> { includes(channel_subs: :user) }
  scope :with_dm, -> { where(has_dm: true) }

  def self.with_user_sub(user_id)
    includes(:subs).where(channel_subs: { user_id: user_id })
  end

  def self.has_dm_subs?(member_ids, chat_workspace_id)
    with_dm.joins(:subs)
      .where(channel_subs: { user_id: member_ids })
      .where(workspace_id: chat_workspace_id)
      .group(:id)
      .having('count(channels.id) = ?', member_ids.length)
      .distinct
      .exists?
  end

  def member_ids=(member_ids)
    @member_ids = member_ids.map(&:to_i)
  end

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def is_user_sub?(user_id)
    !!subs.find_by(channel_subs: { user_id: user_id })
  end

  def class_name
    has_dm? ? 'DM_CHAT' : self.class.name
  end

  after_create :generate_chat_subs
  after_create_commit :broadcast_create
  after_create_commit :generate_unread
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy

  private

  def sub_user_to_public_chat
    subs.create(user_id: owner.id, skip_broadcast: true)
  end

  def sub_users_to_dm_chat
    return unless self.member_ids
    self.member_ids.each_with_index do |member_id, idx|
      in_sidebar = idx === 0 ? true : false
      subs.create(channel_id: id, user_id: member_id, skip_broadcast: true, in_sidebar: in_sidebar)
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
