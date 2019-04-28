class UserAppearance < ApplicationRecord
  STATUS = %w(online offline).freeze

  attr_accessor :skip_broadcast

  validates_presence_of :user_id, :workspace_id, :status
  validates_inclusion_of :status, in: %w(online offline)
  validates_uniqueness_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  def self.by_workspace(workspace_id)
    joins(:workspace).where(workspaces: { id: workspace_id })
      .or(joins(:workspace).where(workspaces: { slug: workspace_id }))
      .take
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
  after_destroy_commit :broadcast_dispatch_destroy

  private

  def broadcast_dispatch_create
    broadcast_create locals: { status: 'online' }
  end

  def broadcast_dispatch_destroy
    broadcast_destroy locals: { status: 'offline' }
  end
end
