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
  has_many :members,
    -> { left_joins(:appears).select('users.*', 'user_appearances.status AS status') },
    class_name: 'User',
    through: :subs,
    source: :user
  has_many :channels
  has_many :favorites, through: :channels
  has_many :chat_subs,
    -> { select('channel_subs.*, channels.slug AS channel_slug, users.slug AS user_slug') },
    through: :channels,
    source: :subs

  def broadcast_name
    "app"
  end

  def is_user_sub?(user_id)
    !!subs.find_by(workspace_subs: { user_id: user_id })
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
