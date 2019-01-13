class Api::WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
  end

  def show
    @workspace = Workspace.find_by_slug(params[:slug])
  end

  def create
    @workspace = current_user.created_workspaces.build(workspace_params)

    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  private

  def workspace_params
    params.require(:workspace).permit(:title, :slug, :owner_id)
  end
end
