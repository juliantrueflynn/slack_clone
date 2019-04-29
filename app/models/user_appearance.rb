class UserAppearance < ApplicationRecord
  STATUS = %w(online offline).freeze

  attr_accessor :skip_broadcast

  validates_presence_of :user_id, :workspace_id, :status
  validates_inclusion_of :status, in: STATUS
  validates_uniqueness_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def self.by_workspace(id_or_slug)
    with_workspace_id(id_or_slug).or(with_workspace_slug(id_or_slug)).take
  end

  def broadcast_name
    "appearance_#{workspace.slug}"
  end

  def workspace_slug
    workspace.slug
  end

  def user_slug
    user.slug
  end

  after_create_commit :broadcast_dispatch_create
  after_destroy_commit :broadcast_dispatch_destroy

  private

  def self.with_workspace_id(id)
    joins(:workspace).where(workspaces: { id: id })
  end

  def self.with_workspace_slug(slug)
    joins(:workspace).where(workspaces: { slug: slug })
  end

  def broadcast_dispatch_create
    broadcast_create locals: { status: 'online' }
  end

  def broadcast_dispatch_destroy
    broadcast_destroy locals: { status: 'offline' }
  end
end
