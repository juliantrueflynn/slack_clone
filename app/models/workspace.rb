class Workspace < ApplicationRecord
  validates :title, :owner_id, presence: true
  validates :slug, uniqueness: true, presence: true
end
