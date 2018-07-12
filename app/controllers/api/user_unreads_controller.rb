class Api::UserUnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_id])
    @user_unreads = Message.user_unreads(user_id: current_user.id, workspace_id: params[:workspace_id])
  end
end
