class Api::WorkspacesController < ApplicationController
  def index
    @workspaces = current_user.workspaces if logged_in?
  end

  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id = current_user.id if logged_in?

    if @workspace.save
      render json: @workspace
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def show
    @workspace = Workspace.find_by(params[:slug])
  end

  def destroy
    @workspace = Workspace.find_by(id: params[:id]) # use 'find_by', 'find' causes error if not found
    if @workspace
      @workspace.destroy
      render json: @workspace
    else
      render json: ['does not exist'], status: 404
    end
  end

  private

  def workspace_params
    params.require(:workspace).permit(:title, :slug, :owner_id)
  end
end
