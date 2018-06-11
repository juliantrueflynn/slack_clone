class WorkspaceSub < ApplicationRecord
  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace

  after_create_commit do
    WorkspaceSubEventsJob.perform_later(type: "WORKSPACE_SUB_CREATE_RECEIVE", workspace_sub: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    WorkspaceSubEventsJob.perform_later(type: "WORKSPACE_SUB_DELETE_RECEIVE", workspace_sub: self)
  end
end
