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

  def user_convos(user_id)
    parents = messages.convo_parents_with_author_id(user_id)
    Message.parents_or_children(parents).includes(:channel, :author)
  end

  def user_convos_reads(user_id)
    messages.select('messages.*', 'reads.accessed_at AS last_read')
      .convo_parents_with_author_id(user_id)
  end

  def user_unreads(user_id)
    messages.channel_unreads_with_user_id(user_id)
      .includes(:author)
      .order(id: :desc)
  end

  def last_entries_created_at_map(user_id)
    channels = messages.channels_last_created_at(user_id)
    convos = messages.convos_last_created_at(user_id)
    convos.merge(channels)
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
