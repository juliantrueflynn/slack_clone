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
  has_many :messages
  has_many :pins, through: :messages
  has_many :reads,
    -> { where(readable_type: 'Channel') },
    foreign_key: :readable_id
  
  scope :with_dm, -> { where(has_dm: true) }
  scope :without_dm, -> { where(has_dm: false) }

  def self.by_workspace_id(workspace_id)
    where(workspace_id: workspace_id)
  end

  def self.has_dm_with_user_ids?(user_ids)
    !!with_dm.by_user_ids(user_ids)
  end

  def self.by_user_ids(users_ids)
    joins(:subs)
      .where(channel_subs: { user_id: users_ids })
      .group('channels.id')
      .having('COUNT(channels.id) > 1')
      .take
  end

  def self.without_user_and_dm(user_id)
    includes(:subs)
      .where("channel_subs.user_id != ? OR channels.has_dm = 'f'", user_id)
      .references(:channel_subs)
      .order(:id)
  end

  def broadcast_name
    "workspace_#{workspace.slug}"
  end

  def owner_slug
    owner ? owner.slug : nil
  end

  def earliest_message_slug
    messages.empty? ? nil : messages.first.slug
  end

  def entries_created_at_before(before_date)
    messages.by_entry_parent.created_at_before(before_date).order(id: :desc)
  end

  HISTORY_CACHE_AMOUNT = 15

  def messages_between(entries)
    start_id = entries.last.id
    start_id = messages.first.id if entries.length < HISTORY_CACHE_AMOUNT
    messages.where("id BETWEEN ? AND ?", start_id, entries.first.id)
  end

  def older_messages(before_date)
    date_from = (before_date || DateTime.current).to_datetime
    entries = entries_created_at_before(date_from).limit(HISTORY_CACHE_AMOUNT)
    return messages if entries.empty?
    messages_between(entries).or(Message.parents_or_children(entries))
  end

  def member_ids=(member_ids)
    @member_ids = member_ids.map(&:to_i)
  end

  def is_user_sub?(user_id)
    !!subs.find_by(channel_subs: { user_id: user_id })
  end

  after_create_commit :sub_users_to_dm_chat, :sub_user_to_public_chat
  after_update_commit :broadcast_update_channel

  private

  def sub_user_to_public_chat
    return unless owner
    subs.create(user_id: owner.id, skip_broadcast: true)
    broadcast_create
  end

  def sub_users_to_dm_chat
    return unless has_dm?
    return unless member_ids

    self.member_ids.each_with_index do |dm_user_id, idx|
      in_sidebar = idx === 0 ? true : false
      subs.create(
        channel_id: id,
        user_id: dm_user_id,
        in_sidebar: in_sidebar,
        skip_broadcast: true
      )
    end

    broadcast_to_new_dm_subs
  end

  def broadcast_to_new_dm_subs
    subs.each do |dm_sub|
      broadcast_create broadcast_name: "dm_user_#{dm_sub.user.id}",
        partial: 'api/channels/channel'
    end
  end

  def broadcast_update_channel 
    broadcast_update partial: 'api/channels/update'
  end
end
