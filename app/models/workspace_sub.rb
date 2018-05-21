class WorkspaceSub < ApplicationRecord
  validates_presence_of :workspace_id, scope: :user_id

  belongs_to :user
  belongs_to :workspace
end
