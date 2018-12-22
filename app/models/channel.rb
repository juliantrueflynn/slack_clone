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
  has_many :reads, foreign_key: :readable_id do
    def find_or_initialize_by_user(user_id)
      find_or_initialize_by(user_id: user_id, readable_type: 'Channel')
    end
  end
  
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

  def last_message_created_at
    last_message = messages.with_parent.last
    last_message.created_at.to_datetime if last_message
  end

  def days_since_created(date)
    start_date = date.midnight.to_date
    days_between = (start_date - created_at.midnight.to_date).to_i
    days_between > 0 ? days_between : 1
  end

  def recent_messages(start_date)
    days_deep = days_since_created(start_date)
    messages.created_recently(start_date, days_deep)
  end

  def previous_messages(end_date)
    messages.created_until(end_date.midnight)
  end

  def history_messages(until_date = nil)
    return messages if messages.by_entry_parent.length <= 12
    return recent_messages(last_message_created_at) if until_date.nil?
    previous_messages(until_date)
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
    return unless has_dm? || member_ids

    self.member_ids.each_with_index do |dm_user_id, idx|
      in_sidebar = idx === 0 ? true : false
      subs.create(
        channel_id: id,
        user_id: dm_user_id,
        in_sidebar: in_sidebar,
        skip_broadcast: true
      )
    end

    broadcast_create
  end

  def broadcast_update_channel 
    broadcast_update partial: 'api/channels/update'
  end
end
