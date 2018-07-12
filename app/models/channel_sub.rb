class ChannelSub < ApplicationRecord
  validates_presence_of :channel_id, scope: :user_id

  belongs_to :user
  belongs_to :channel

  private

  def workspace
    channel.workspace 
  end

  after_create_commit do
    channel.reads.create!(user_id: user_id, accessed_at: DateTime.now)
    WorkspaceJob.perform_later(workspace.slug, type: "CHANNEL_SUB_CREATE_RECEIVE", channel_sub: self)
  end

  # This works but after_destroy_commit does not for some reason
  after_destroy :delete_message
  def delete_message
    WorkspaceJob.perform_later(workspace.slug, type: "CHANNEL_SUB_DELETE_RECEIVE", channel_sub: self)
  end
end
