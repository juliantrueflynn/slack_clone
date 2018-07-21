class UserAppearance < ApplicationRecord
  validates_presence_of :user_id, :workspace_slug, :status
  validates_uniqueness_of :workspace_slug, scope: :user_id

  belongs_to :user

  def self.in_workspace(slug)
    find_by(workspace_slug: slug)
  end

  def online!
    new_record? && save
    self
  end

  def away!
    update(status: 'AWAY')
    self
  end

  def busy!
    update(status: 'BUSY')
    self
  end

  private

  after_create :broadcast
  after_update :broadcast
  after_destroy { broadcast('OFFLINE') }

  def broadcast(new_status = nil)
    HashDispatcherJob.perform_later channel_name: "workspace_#{workspace_slug}",
      type: action_type,
      status: new_status || status,
      user_slug: user.slug
  end
end
