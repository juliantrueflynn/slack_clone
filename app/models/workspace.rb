class Workspace < ApplicationRecord
  validates :title, :owner_id, presence: true
  validates_length_of :title,
    within: 3..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)'
  validates :slug, uniqueness: true, presence: true
  validates_exclusion_of :slug,
    in: %w(api create-workspace assets signin signout stylesheets javascripts
        images messages),
    message: "Taken, sorry!"
  
  has_many :subs,
    class_name: 'WorkspaceSub',
    dependent: :destroy
  has_many :members,
    class_name: 'User',
    through: :subs,
    source: :user
  has_many :channels
  has_many :favs,
      through: :channels

  def is_user_subbed?(user)
    users_subbed = subs.where(workspace_subs: { user_id: user.id })
    users_subbed
  end
end
