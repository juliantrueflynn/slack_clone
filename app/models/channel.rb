class Channel < ApplicationRecord
  before_validation :generate_slug

  validates_presence_of :title, :slug, :owner_id, :workspace_id
  validates_uniqueness_of :slug
  validates_length_of :title,
    within: 2..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)'

  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  belongs_to :workspace
  has_many :channel_subs, foreign_key: :channel_id, dependent: :destroy
  has_many :members, class_name: 'User', through: :channel_subs, source: :user
  has_many :messages, -> { includes(:parent_message, reactions: :message, favorites: :message) }, dependent: :destroy
  has_many :favorites, through: :messages, source: :favorites
  has_many :reactions, through: :messages, source: :reactions

  scope :with_subs, -> { includes(channel_subs: :user) }

  def is_user_sub?(user_id)
    !!channel_subs.find_by(channel_subs: { user_id: user_id })
  end

  private

  def generate_slug
    return slug if slug
    
    loop do
      token = SecureRandom.urlsafe_base64(8)
      title_slugged = title.truncate(18, omission: '').parameterize
      self.slug = "#{title_slugged}-#{token}"
      break unless Channel.where(slug: slug).exists?
    end
  end

  after_create_commit do
    owner.channel_subs.create(channel_id: id, user_id: owner_id)
    
    WorkspaceJob.perform_later(workspace.slug, type: "CHANNEL_CREATE_RECEIVE", channel: self)
  end

  after_update_commit do
    WorkspaceJob.perform_later(workspace.slug, type: "CHANNEL_UPDATE_RECEIVE", channel: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_channel
  def delete_channel
    WorkspaceJob.perform_later(workspace.slug, type: "CHANNEL_DELETE_RECEIVE", channel: self)
  end
end
