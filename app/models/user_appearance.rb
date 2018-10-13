class UserAppearance < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :user_id, :workspace_slug, :status
  validates_uniqueness_of :workspace_slug, scope: :user_id

  belongs_to :user

  def self.in_workspace(slug)
    find_by(workspace_slug: slug)
  end

  def broadcast_name
    "appearance_#{workspace_slug}"
  end

  private

  after_create_commit :broadcast_dispatch_create
  after_destroy :broadcast_dispatch_destroy

  def broadcast_dispatch_create
    broadcast_create locals: { status: 'ONLINE' }
  end

  def broadcast_dispatch_destroy
    broadcast_destroy locals: { status: 'OFFLINE' }
  end
end
