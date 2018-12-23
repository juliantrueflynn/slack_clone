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
  has_many :favorites
  has_many :channel_subs,
    through: :channels,
    source: :subs
  has_many :chat_subs,
    -> { select('channel_subs.*, channels.slug AS channel_slug, users.slug AS user_slug') },
    through: :channels,
    source: :subs
  has_many :reads
  has_many :messages, through: :channels

  def broadcast_name
    "app"
  end

  def is_user_sub?(user_id)
    !!subs.find_by(workspace_subs: { user_id: user_id })
  end

  def user_convos(user_id)
    messages.convos_with_author_id(user_id)
      .includes(:channel, :author)
  end

  def channels_unreads(user_id)
    Message.where(id: Message.find_by_sql(["SELECT messages.*
      FROM messages, channels, reads
      WHERE reads.readable_id = channels.id 
        AND messages.channel_id = channels.id
        AND channels.workspace_id = ?
        AND reads.user_id = ?
        AND messages.entity_type = 'entry'
        AND messages.parent_message_id IS NULL
        AND messages.created_at > reads.accessed_at", self.id, user_id])
    )
  end
  
  def latest_entries(user_id)
    channel_entries_ids = messages.channel_last_entry_id(user_id).values
    convos_entries_ids = messages.convos_last_entry_id(user_id).values
    entries_ids = (channel_entries_ids + convos_entries_ids)
    Message.where(id: entries_ids)
  end

  after_create :generate_workspace_subs, :generate_default_channels
  after_create_commit :broadcast_create

  private

  DEFAULT_CHANNELS = %w(general random)

  def generate_default_channels
    return if skip_broadcast

    defaults_params = DEFAULT_CHANNELS.reduce([]) do |memo, ch_title|
      memo << { title: ch_title, owner_id: owner_id, skip_broadcast: true }
    end

    channels.create(defaults_params)
  end

  def generate_workspace_subs
    subs.create(user_id: owner.id, skip_broadcast: true)
  end
end
