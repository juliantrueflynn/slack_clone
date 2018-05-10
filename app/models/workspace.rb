class Workspace < ApplicationRecord
  before_validation :generate_slug

  validates :title, :owner_id, presence: true
  validates :slug, uniqueness: true, presence: true

  has_many :subs,
    foreign_key: :workspace_id,
    class_name: 'WorkspaceSub',
    dependent: :destroy

  has_many :channels

  def is_user_subbed?(user)
    users_subbed = subs.where(workspace_subs: { user_id: user.id })
    users_subbed
  end

  def to_param
    slug
  end

  private

  def generate_slug
    return slug if slug
    self.slug = title.parameterize
  end
end
