class Workspace < ApplicationRecord
  before_validation :generate_slug

  validates :title, :owner_id, presence: true
  validates :slug, uniqueness: true, presence: true
  validates_exclusion_of :slug,
    in: %w(api create-workspace assets sign-in sign-out stylesheets javascripts images ),
    message: "Taken, sorry!"

  has_many :subs,
    foreign_key: :workspace_id,
    class_name: 'WorkspaceSub',
    dependent: :destroy

  has_many :channels

  def is_user_subbed?(user)
    users_subbed = subs.where(workspace_subs: { user_id: user.id })
    users_subbed
  end

  private

  def generate_slug
    return slug if slug
    self.slug = title.parameterize
  end
end
