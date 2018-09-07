class Api::UserUnreadsController < ApplicationController
  def index
    workspace_id = Workspace.find_by(slug: params[:workspace_slug]).id
    @channel_reads = current_user.reads.where(workspace_id: workspace_id, readable_type: 'Channel')
  end
end
