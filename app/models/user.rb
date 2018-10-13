class User < ApplicationRecord
  attr_reader :password
  attr_accessor :is_avatar_update

  before_validation :generate_slug, unless: :slug?
  after_initialize :ensure_session_token

  validates_presence_of :username, :email, :password_digest, :session_token
  validates_uniqueness_of :username, :email
  validates_length_of :password, minimum: 6, allow_nil: true

  mount_uploader :avatar, AvatarUploader

  has_many :created_workspaces,
    class_name: 'Workspace',
    foreign_key: :owner_id
  has_many :created_channels,
    class_name: 'Channel',
    foreign_key: :owner_id
  has_many :workspace_subs
  has_many :workspaces, through: :workspace_subs
  has_many :channel_subs
  has_many :channels, through: :channel_subs
  has_many :messages, foreign_key: :author_id
  has_many :favorites
  has_many :reactions
  has_many :appears, class_name: 'UserAppearance'
  has_many :reads

  def self.find_by_email_and_password(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def find_dm_chat_with_user(workspace_id, user_id)
    users_ids = [id, user_id]
    Channel.find_dm_chat_by_workspace_and_users(workspace_id, users_ids)
  end

  def is_workspace_sub?(workspace)
    workspaces_subbed = workspace_subs.where(workspace_subs: { workspace_id: workspace.id })
    workspaces_subbed.length > 0
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

  def broadcast_name
    "app"
  end

  def avatar_displays
    { thumb: avatar.thumb.url, banner: avatar.banner.url }
  end

  after_update_commit :broadcast_dispatch_update

  private

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

  def broadcast_dispatch_update
    broadcast_update partial: 'api/users/update'
  end
end