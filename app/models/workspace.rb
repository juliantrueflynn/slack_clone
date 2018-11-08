class Workspace < ApplicationRecord
  attr_accessor :skip_broadcast
  
  validates_presence_of :title, :slug, :owner_id
  validates_uniqueness_of :slug
  validates_length_of :title,
    within: 3..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)'
  validates_exclusion_of :slug,
    in: %w(api create-workspace assets signin signout),
    message: "Taken, sorry!"

  belongs_to :owner, class_name: 'User'
  has_many :subs, class_name: 'WorkspaceSub'
  has_many :users, through: :subs
  has_many :user_appearances
  has_many :channels
  has_many :favorites, through: :channels
  has_many :channel_subs,
    through: :channels,
    source: :subs
  has_many :chat_subs,
    -> { select('channel_subs.*, channels.slug AS channel_slug, users.slug AS user_slug') },
    through: :channels,
    source: :subs do
      def with_user_id(user_id)
        where(channel_id: where(user_id: user_id).pluck(:channel_id))
      end
    end
  has_many :reads
  has_many :unreads
  has_many :messages, through: :channels
  has_many :entries,
    -> { joins(channel: :subs).select('messages.*, channels.slug AS channel_slug') },
    through: :channels do
      def with_user(user_id)
        where(channel_subs: { user_id: user_id })
      end
    end
  
  def self.by_slug(slug)
    find_by(slug: slug)
  end

  def broadcast_name
    "app"
  end

  def is_user_sub?(user_id)
    !!subs.find_by(workspace_subs: { user_id: user_id })
  end

  def convos_with_user_id(user_id)
    Message.convos_by_workspace_with_user(id, user_id)
      .includes(:parent_message, :channel, :author)
  end

  def convo_parents_with_user_id(user_id)
    Message.convo_parents_by_workspace_with_user(id, user_id)
      .includes(:channel, :author)
  end

  def channels_last_read_by_user(user_id)
    reads.channels_with_user(user_id)
      .left_outer_joins(channel: :messages)
      .where.not(messages: { channel_id: nil })
      .distinct
  end

  after_create :generate_workspace_subs, :generate_default_chats
  after_create_commit :broadcast_create
  after_update_commit :broadcast_update
  after_destroy :broadcast_destroy

  private

  DEFAULT_CHAT_TITLES = %w(general random).freeze

  def generate_default_chats
    DEFAULT_CHAT_TITLES.each do |ch_title|
      channels.create(title: ch_title, owner_id: owner_id, workspace_id: id, skip_broadcast: true)
    end
  end

  def generate_workspace_subs
    subs.create(user_id: owner.id, skip_broadcast: true)
  end
end
