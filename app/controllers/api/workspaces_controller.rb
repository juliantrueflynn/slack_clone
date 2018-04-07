class Api::WorkspacesController < ApplicationController
  def index
    if logged_in?
      @workspaces = Workspace.for_current_user(current_user)
    end
  end

  def create
    @workspace = Workspace.new(workspace_params)
    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages
    end
  end

  def show
    @workspace = Workspace.find(params[:id])
  end

  def destroy
    @workspace = Workspace.find(params[:id])
    @workspace.destroy
    render json: @workspace
  end

  private

  def workspace_params
    params.require(:workspace).permit(:title, :slug, :owner_id)
  end
end
