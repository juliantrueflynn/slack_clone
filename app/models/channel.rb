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
  has_many :subs, class_name: 'ChannelSub', foreign_key: :channel_id, dependent: :destroy
  has_many :members, class_name: 'User', through: :subs, source: :user
  has_many :messages, dependent: :destroy
  has_many :favorites, through: :messages, source: :favorites
  has_many :reactions, through: :messages, source: :reactions

  def is_user_subbed?(user)
    users_subbed = subs.where(channel_subs: { user_id: user.id })
    users_subbed.length > 0
  end

  def self.subbed_by_user_in_workspace(user_id, workspace_id)
    self.joins(:subs).where(channel_subs: { user_id: user_id })
  end

  def parent_messages
    messages.where(parent_message_id: nil)
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
