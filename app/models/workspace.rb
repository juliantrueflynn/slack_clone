class Workspace < ApplicationRecord
  validates :title, :owner_slug, presence: true
  validates_length_of :title,
    within: 3..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)'
  validates :slug, uniqueness: true, presence: true
  validates_exclusion_of :slug,
    in: %w(api create-workspace assets signin signout stylesheets javascripts images ),
    message: "Taken, sorry!"
  has_many :subs,
    primary_key: :slug,
    foreign_key: :workspace_slug,
    class_name: 'WorkspaceSub',
    dependent: :destroy
  has_many :channels,
    primary_key: :slug,
    foreign_key: :workspace_slug

  def is_user_subbed?(user)
    users_subbed = subs.where(workspace_subs: { user_slug: user.slug })
    users_subbed
  end
end
