class Api::UserThreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @user_threads = workspace.user_convos(current_user.id)
  end
end
