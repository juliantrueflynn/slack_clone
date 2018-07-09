class User < ApplicationRecord
  attr_reader :password

  before_validation :generate_slug
  after_initialize :ensure_session_token

  validates_presence_of :username, :email, :password_digest, :session_token
  validates_uniqueness_of :username, :email
  validates_length_of :password, minimum: 6, allow_nil: true

  has_many :created_workspaces, class_name: 'Workspace', foreign_key: :owner_id
  has_many :created_channels, class_name: 'Channel', foreign_key: :owner_id
  has_many :workspace_subs, dependent: :destroy
  has_many :workspaces, through: :workspace_subs, source: :workspace
  has_many :channel_subs, dependent: :destroy
  has_many :channels, through: :channel_subs, source: :channel
  has_many :messages, foreign_key: :author_id
  has_many :thread_replies, through: :messages, source: :replies
  has_many :thread_messages,
    ->(user) { Message.unscope(where: :author_id).threads_with_author_id(user.id) },
    class_name: 'Message',
    foreign_key: :author_id
  has_many :favorites, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :appears, class_name: 'UserAppearance', dependent: :destroy
  has_many :reads, as: :readable, dependent: :destroy

  def self.find_by_email_and_password(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_workspace_sub?(workspace)
    workspaces_subbed = workspace_subs.where(workspace_subs: { workspace_id: workspace.id })
    workspaces_subbed.length > 0
  end

  def is_channel_sub?(channel)
    channels_subbed = channel_subs.where(channel_subs: { channel_id: channel })
    channels_subbed.length > 0
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    password_hash = BCrypt::Password.new(self.password_digest)
    password_hash.is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def generate_slug
    return slug if slug
    
    loop do
      slug_token = SecureRandom.urlsafe_base64(8)
      username_slugged = username.parameterize
      self.slug = "#{username_slugged}-#{slug_token}"
      break unless User.where(slug: slug).exists?
    end
  end

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end
end