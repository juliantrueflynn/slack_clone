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

  def self.thread_ids(author_id)
    Message.with_children.where(author_id: author_id).pluck(:thread_id)
  end

  def self.replied_to_thread_ids(author_id)
    Message.with_children.where(message_threads: { author_id: author_id }).pluck(:thread_id)
  end

  def self.thread_messages(author_id)
    thread_ids = (User.thread_ids(author_id) + User.replied_to_thread_ids(author_id)).uniq
    Message.with_children.where(message_threads: { thread_id: thread_ids })
  end

  has_many :created_workspaces, class_name: 'Workspace', foreign_key: :owner_id
  has_many :created_channels, class_name: 'Channel', foreign_key: :owner_id
  has_many :workspace_subs, dependent: :destroy
  has_many :workspaces, through: :workspace_subs, source: :workspace
  has_many :channel_subs, dependent: :destroy
  has_many :channels, through: :channel_subs, source: :channel
  has_many :messages, foreign_key: :author_id, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :threads, ->(user) { User.thread_messages(user.id) },
    class_name: 'Message',
    foreign_key: :author_id,
    dependent: :destroy

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
    WorkspaceJob.perform_later(workspace_slug, type: 'SET_STATUS', user_slug: slug, status: appearance)
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
