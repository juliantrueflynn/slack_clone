class Channel < ApplicationRecord
  before_validation :generate_slug

  validates :title, :owner_id, :workspace_id, presence: true
  validates :slug, uniqueness: true, presence: true

  belongs_to :owner, foreign_key: :owner_id, class_name: 'User'
  belongs_to :workspace
  has_many :subs, class_name: 'ChannelSub'
  has_many :members, class_name: 'User', foreign_key: :user_id, through: :subs, source: :user
  has_many :messages

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

  # May not be necessary and do this through redux
  # def to_param
  #   slug
  # end

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
