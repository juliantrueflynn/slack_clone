class Channel < ApplicationRecord
  before_validation :generate_slug

  validates :title, :owner_slug, :workspace_slug, presence: true
  validates :slug, uniqueness: true, presence: true

  belongs_to :owner,
    class_name: 'User',
    primary_key: :slug,
    foreign_key: :owner_slug
  belongs_to :workspace,
    primary_key: :slug,
    foreign_key: :workspace_slug
  has_many :subs,
    class_name: 'ChannelSub',
    primary_key: :slug,
    foreign_key: :user_slug
  has_many :members,
    class_name: 'User',
    primary_key: :slug,
    through: :subs,
    source: :user
  has_many :messages,
    primary_key: :slug,
    foreign_key: :channel_slug

  def is_user_subbed?(user)
    users_subbed = subs.where(channel_subs: { user_slug: user.slug })
    users_subbed.length > 0
  end

  def self.subbed_by_user_in_workspace(user_slug, workspace_slug)
    self.joins(:subs).where(channel_subs: { user_slug: user_slug })
  end

  def parent_messages
    messages.where(parent_message_slug: nil)
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
end
