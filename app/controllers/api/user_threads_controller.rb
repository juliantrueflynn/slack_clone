class Api::UserThreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @user_threads = workspace.convos_with_user_id(current_user.id)
  end
end
