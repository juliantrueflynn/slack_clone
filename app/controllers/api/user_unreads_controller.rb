class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @reads = workspace.channels_last_read_by_user(current_user.id).includes(:channel)
  end
end
