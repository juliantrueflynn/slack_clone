class Chatroom < ApplicationRecord
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
  has_many :chatroom_subs
  has_many :users, through: :chatroom_subs
  has_many :messages
  has_many :entries_parents,
    -> { with_entry_type.with_parent },
    class_name: 'Message'
  has_many :pins, through: :messages
  has_many :reads,
    -> { chatrooms },
    foreign_key: :readable_id
  
  alias_attribute :subs, :chatroom_subs
  
  scope :with_dm, -> { where(has_dm: true) }
  scope :without_dm, -> { where(has_dm: false) }

  def self.with_workspace(workspace_id)
    where(workspace_id: workspace_id)
  end

  def self.has_dm_with_users?(user_ids)
    !!with_dm.with_users(user_ids)
  end

  def self.with_users(users_ids)
    joins(:chatroom_subs)
      .where(chatroom_subs: { user_id: users_ids })
      .group('chatrooms.id')
      .having('COUNT(chatrooms.id) > 1')
      .take
  end

  def self.without_user_sub(user_id)
    includes(:chatroom_subs).where.not(chatroom_subs: { user_id: user_id })
  end

  def self.without_user_and_dm(user_id)
    includes(:chatroom_subs)
      .where("chatroom_subs.user_id != ? OR chatrooms.has_dm = 'f'", user_id)
      .references(:chatroom_subs)
      .order(:id)
  end

  def member_ids=(member_ids)
    @member_ids = member_ids.map(&:to_i)
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

  ENTRIES_CACHE_SIZE = 15

  def older_messages(last_message_id)
    return messages if entries_parents.length <= ENTRIES_CACHE_SIZE
    last_id = last_message_id || entries_parents.last.id
    entries = entries_before_message_id(last_id)
    messages_between(last_id, entries).or(Message.children_of(entries))
  end

  after_create_commit :generate_dm_chatroom_subs, :generate_chatroom_subs
  after_update_commit :broadcast_update_chatroom

  private

  def generate_chatroom_subs
    return unless owner
    subs.create(user_id: owner.id, skip_broadcast: true)
    broadcast_create
  end

  def generate_dm_chatroom_subs
    return unless has_dm?
    subs.create(dm_chatroom_subs_params)
    broadcast_to_new_dm_subs
  end

  def broadcast_update_chatroom 
    broadcast_update partial: 'api/chatrooms/update'
  end

  def dm_chatroom_subs_params
    member_ids.each_with_index.reduce([]) do |memo, (user_id, idx)|
      in_sidebar = idx === 0
      memo << { user_id: user_id, in_sidebar: in_sidebar, skip_broadcast: true }
    end
  end

  def broadcast_to_new_dm_subs
    subs.each do |dm_sub|
      broadcast_create broadcast_name: "dm_user_#{dm_sub.user.id}",
        partial: 'api/chatrooms/chatroom'
    end
  end

  def entries_before_message_id(message_id)
    entries_parents.with_id_before(message_id)
      .order(id: :desc)
      .limit(ENTRIES_CACHE_SIZE)
  end

  def messages_between(latest_id, entries)
    almost_empty = entries.length < ENTRIES_CACHE_SIZE
    return messages.with_id_before(latest_id) if almost_empty
    messages.where("id BETWEEN ? AND ?", entries.last.id, latest_id)
  end
end
