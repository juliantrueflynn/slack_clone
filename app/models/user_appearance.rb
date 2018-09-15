class UserAppearance < ApplicationRecord
  attr_accessor :skip_broadcast

  validates_presence_of :user_id, :workspace_slug, :status
  validates_uniqueness_of :workspace_slug, scope: :user_id

  belongs_to :user

  def self.in_workspace(slug)
    find_by(workspace_slug: slug)
  end

  def broadcast_name
    "workspace_#{workspace_slug}"
  end

  private

  after_create_commit { broadcast 'CREATE' }
  after_destroy { broadcast 'DESTROY', 'OFFLINE' }

  def broadcast(type, new_status = nil)
    HashDispatcherJob.perform_later channel_name: "workspace_#{workspace_slug}",
      type: action_type(type),
      status: new_status || status,
      user_id: user_id,
      user_slug: user.slug
  end
end
