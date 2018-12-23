class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @unreads = workspace.channels_unreads(current_user.id)
  end
end
