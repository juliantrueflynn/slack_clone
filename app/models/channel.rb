class Channel < ApplicationRecord
  attr_accessor :skip_broadcast, :member_ids, :last_read

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
  has_many :messages,
    -> { includes(:parent_message) }
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
  has_many :reads, as: :readable

  scope :with_subs, -> { includes(channel_subs: :user) }

  def self.with_user_sub(user_id)
    includes(:subs).where(channel_subs: { user_id: user_id })
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

  after_create_commit :broadcast_create_chat
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy

  private

  def sub_user_to_public_chat
    subs.create(user_id: owner.id, skip_broadcast: true) if owner
  end

  def sub_users_to_dm_chat
    return if self.member_ids
    self.member_ids.each do |sub_id|
      subs.create(channel_id: id, user_id: sub_id, skip_broadcast: true)
    end
  end

  def broadcast_create_chat
    has_dm? ? sub_users_to_dm_chat : sub_user_to_public_chat
    broadcast_create
  end
end
