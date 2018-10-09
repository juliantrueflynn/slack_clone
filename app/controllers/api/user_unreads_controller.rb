class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @reads = Read.channels_in_workspace_with_user(workspace.id, current_user.id)
  end
end
