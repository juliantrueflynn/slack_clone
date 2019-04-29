class User < ApplicationRecord
  include Concerns::Sluggable

  attr_accessor :skip_broadcast
  attr_reader :password

  validates_presence_of :username, :email, :password_digest, :session_token, :slug
  validates_uniqueness_of :username, :email, :slug
  validates_length_of :password, minimum: 6, allow_nil: true

  mount_uploader :avatar, AvatarUploader

  has_many :created_workspaces, class_name: 'Workspace', foreign_key: :owner_id
  has_many :created_chatrooms, class_name: 'Chatroom', foreign_key: :owner_id
  has_many :workspace_subs
  has_many :workspaces, through: :workspace_subs
  has_many :chatroom_subs
  has_many :chatrooms, through: :chatroom_subs
  has_many :messages, foreign_key: :author_id
  has_many :favorites
  has_many :reactions
  has_many :appears, class_name: 'UserAppearance'
  has_many :reads
  has_many :pins

  def self.find_by_email_and_password(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def broadcast_name
    'app'
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
    update_columns(session_token: session_token)
    self.session_token
  end

  def offline!(workspace_slug)
    user_appearance = appears.by_workspace(workspace_slug)
    return if user_appearance.nil?
    user_appearance.destroy!
  end

  after_initialize :ensure_session_token
  after_update_commit :user_broadcast_update

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def generate_unique_session_token
    self.session_token = new_session_token

    while User.find_by_session_token(self.session_token)
      self.session_token = new_session_token
    end

    self.session_token
  end

  def user_broadcast_update
    return if saved_change_to_password_digest?
    broadcast_update
  end
end