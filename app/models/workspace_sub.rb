class WorkspaceSub < ApplicationRecord
  belongs_to :user,
    primary_key: :slug,
    foreign_key: :user_slug
  belongs_to :workspace,
    primary_key: :slug,
    foreign_key: :workspace_slug
end
