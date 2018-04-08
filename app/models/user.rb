class User < ApplicationRecord
  attr_reader :password

  after_initialize :ensure_session_token

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :channels, foreign_key: :owner_id
  has_many :workspace_subs, dependent: :destroy
  has_many :channel_subs, dependent: :destroy

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
    channels_subbed = channel_subs.where(channel_subs: { channel_id: channel.id })
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
