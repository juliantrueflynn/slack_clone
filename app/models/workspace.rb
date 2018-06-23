class Workspace < ApplicationRecord
  EXCLUDED_SLUGS = %w(api create-workspace assets signin signout stylesheets javascripts images messages).freeze
  
  validates_presence_of :title, :slug, :owner_id
  validates_uniqueness_of :slug
  validates_length_of :title,
    within: 3..55,
    too_long: 'title too long (max: 55 characters)',
    too_short: 'title too short (min: 3 characters)'
  validates_exclusion_of :slug, in: EXCLUDED_SLUGS, message: "Taken, sorry!"
  
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id
  has_many :subs, class_name: 'WorkspaceSub', dependent: :destroy
  has_many :members, class_name: 'User', through: :subs, source: :user
  has_many :channels, dependent: :destroy
  has_many :favorites, through: :channels

  def is_user_subbed?(user)
    users_subbed = subs.where(workspace_subs: { user_id: user.id })
    users_subbed
  end

  private

  after_create_commit do
    owner.workspace_subs.create(workspace_id: id, user_id: owner_id)
    channels.create([
      {title: 'General', owner_id: owner_id, workspace_id: id},
      {title: 'Random', owner_id: owner_id, workspace_id: id}
    ])
    AppJob.perform_later(type: 'WORKSPACE_CREATE_RECEIVE', workspace: self)
  end

  after_update_commit do
    AppJob.perform_later(type: "WORKSPACE_UPDATE_RECEIVE", workspace: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_workspace
  def delete_workspace
    AppJob.perform_later(type: "WORKSPACE_DELETE_RECEIVE", workspace: self)
  end
end
