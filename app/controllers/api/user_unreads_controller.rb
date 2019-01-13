class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    @unreads = workspace.user_unreads(current_user.id)
  end
end
