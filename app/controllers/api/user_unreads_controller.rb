class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @reads = current_user.reads.where(workspace_id: workspace.id, readable_type: 'Channel')
  end
end
