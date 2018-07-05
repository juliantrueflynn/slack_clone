class UserAppearance < ApplicationRecord
  validates_presence_of :user_id, :workspace_slug, :status
  validates_uniqueness_of :workspace_slug, scope: :user_id

  belongs_to :user

  def self.find_or_create_by_workspace_slug(slug)
    find_or_create_by(workspace_slug: slug) do |user_appearance|
      user_appearance.status = 'ONLINE'
    end
  end

  def self.in_workspace(slug)
    find_by(workspace_slug: slug)
  end

  def away!
    update!(status: 'AWAY')
  end

  def busy!
    update!(status: 'BUSY')
  end

  def broadcast(params)
    defaults = { type: 'SET_STATUS', status: status, workspace_slug: workspace_slug }
    options = defaults.merge(params)
    AppearanceJob.perform_later(options)
  end
end
