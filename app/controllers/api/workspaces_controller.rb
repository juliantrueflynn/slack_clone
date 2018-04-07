class Api::WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
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
  end

  private

  def workspace_params
    params.require(:workspace).permit(:title, :slug, :owner_id)
  end
end
