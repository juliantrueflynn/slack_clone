class Workspace < ApplicationRecord
  validates :title, :owner_id, presence: true
  validates :slug, uniqueness: true, presence: true

  def self.for_current_user(current_user)
    # TODO: refactor to workspaces user created or invited to
    self.find_by(owner_id: current_user)
  end
end
