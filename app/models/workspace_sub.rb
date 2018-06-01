class WorkspaceSub < ApplicationRecord
  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  after_create_commit do
    WorkspaceSubEventsJob.perform_later(event: "CREATE_WORKSPACE_SUB", sub: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    WorkspaceSubEventsJob.perform_later(event: "DELETE_WORKSPACE_SUB", sub: self)
  end
end
