class Api::WorkspacesController < ApplicationController
  before_action :set_workspace, only: [:show, :update, :destroy]

  def index
    @workspaces = current_user.workspaces
  end

  def show
  end

  def update
    if @workspace.update(workspace_params)
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id = current_user.id

    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def destroy
    if @workspace
      @workspace.destroy
      render json: @workspace
    else
      render json: ['does not exist'], status: 404
    end
  end

  private

  def set_workspace
    @workspace = Workspace.find_by(slug: params[:slug])
  end

  def workspace_params
    params.require(:workspace).permit(:title, :slug, :owner_id)
  end
end
