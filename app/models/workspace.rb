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
  has_many :reads
  has_many :channels
  has_many :channel_subs,
    through: :channels,
    source: :subs
  has_many :messages, through: :channels

  def broadcast_name
    "app"
  end

  def members
    users.select('users.*', 'user_appearances.status AS status')
      .left_joins(:appears)
      .order(:id)
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
    Message.where(id: entries_ids).includes(:author, :channel, :parent_message)
  end

  def channels_ids_with_user_id(user_id)
    channel_subs.where(user_id: user_id).pluck(:channel_id)
  end

  def generate_default_channel_reads(user = owner)
    user.reads.create(default_channel_reads_params)
  end

  def default_channel_reads_params
    default_channels.reduce([]) do |memo, channel|
      memo << { readable_id: channel.id, readable_type: 'Channel' }
    end
  end

  def default_channels
    channels.first(2)
  end

  after_create_commit :create_defaults_broadcast

  private

  def create_defaults_broadcast
    generate_workspace_subs
    generate_default_channels
    generate_default_channel_reads
    broadcast_create
  end

  def generate_workspace_subs
    workspace_subs.create(user_id: owner.id, skip_broadcast: true)
  end

  def generate_default_channels
    return if skip_broadcast
    channels.create(default_channels_params)
  end

  DEFAULT_CHAT_TITLES = %w(general random)

  def default_channels_params
    DEFAULT_CHAT_TITLES.reduce([]) do |memo, ch_title|
      memo << { title: ch_title, owner_id: owner_id, skip_broadcast: true }
    end
  end
end
