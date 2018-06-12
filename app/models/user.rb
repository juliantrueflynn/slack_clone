class User < ApplicationRecord
  APPEARANCE_STATES = %w(OFFLINE ONLINE AWAY BUSY).freeze

  attr_reader :password

  before_validation :generate_slug
  after_initialize :assign_default_appearance
  after_initialize :ensure_session_token

  validates :username, :email, :password_digest, :session_token, :appearance, presence: true
  validates :appearance, inclusion: APPEARANCE_STATES
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :created_workspaces,
    class_name: 'Workspace',
    foreign_key: :owner_id
  has_many :created_channels,
    class_name: 'Channel',
    foreign_key: :owner_id
  has_many :workspace_subs, dependent: :destroy
  has_many :workspaces,
    through: :workspace_subs,
    source: :workspace
  has_many :channel_subs, dependent: :destroy
  has_many :channels,
    through: :channel_subs,
    source: :channel
  has_many :messages, foreign_key: :author_id
  has_many :favs,
    class_name: 'MessageFav'
  has_many :reactions

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

  def appear!(status, workspace_slug)
    self.appearance = status
    save!
    ActionCable.server.broadcast("workspace_#{workspace_slug}", type: 'SET_STATUS', user_slug: slug, status: appearance)
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

  def assign_default_appearance
    self.appearance ||= 'OFFLINE'
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
