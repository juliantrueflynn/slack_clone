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
  has_many :workspace_subs
  has_many :users, through: :workspace_subs
  has_many :user_appearances
  has_many :channels
  has_many :channel_subs,
    through: :channels,
    source: :subs
  has_many :messages, through: :channels

  def broadcast_name
    "app"
  end

  def is_user_sub?(user_id)
    !!workspace_subs.find_by(workspace_subs: { user_id: user_id })
  end

  def user_convos(user_id)
    messages.convos_with_author_id(user_id).includes(:channel, :author)
  end

  def user_unreads(user_id)
    messages.channel_unreads_with_user_id(user_id)
      .includes(:author)
      .order(id: :desc)
  end
  
  def latest_entries(user_id)
    channel_entries_ids = messages.channel_last_entry_id(user_id).values
    convos_entries_ids = messages.convos_last_entry_id(user_id).values
    entries_ids = (channel_entries_ids + convos_entries_ids)
    Message.where(id: entries_ids)
  end

  def channels_ids_with_user_id(user_id)
    channel_subs.where(user_id: user_id).pluck(:channel_id)
  end

  after_create_commit :generate_defaults, :broadcast_create

  private

  def generate_defaults
    generate_workspace_subs
    generate_default_channels
  end

  DEFAULT_CHAT_TITLES = %w(general random)

  def default_channels
    DEFAULT_CHAT_TITLES.reduce([]) do |memo, ch_title|
      memo << { title: ch_title, owner_id: owner_id, skip_broadcast: true }
    end
  end

  def generate_default_channels
    return if skip_broadcast
    channels.create(default_channels)
  end

  def generate_workspace_subs
    workspace_subs.create(user_id: owner.id, skip_broadcast: true)
  end
end
