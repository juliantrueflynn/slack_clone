class UserAppearance < ApplicationRecord
  validates_presence_of :user_id, :workspace_id, :status
  validates_inclusion_of :status, in: %w(online offline)
  validates_uniqueness_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def self.in_workspace(id)
    find_by(workspace_id: id)
  end

  def self.by_workspace_slug(slug)
    workspace = Workspace.find_by(slug: slug)
    in_workspace(workspace.id)
  end

  def broadcast_name
    "appearance_#{workspace_slug}"
  end

  def workspace_slug
    workspace.slug
  end

  def user_slug
    user.slug
  end

  after_create_commit :broadcast_dispatch_create
  after_destroy :broadcast_dispatch_destroy

  private

  def broadcast_dispatch_create
    broadcast_create locals: { status: 'online' }
  end

  def broadcast_dispatch_destroy
    broadcast_destroy locals: { status: 'offline' }
  end
end
