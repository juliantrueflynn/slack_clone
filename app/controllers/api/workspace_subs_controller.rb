class Api::WorkspaceSubsController < ApplicationController
  def create
    @workspace_sub = WorkspaceSub.new(workspace_sub_params)
    @workspace_sub.user_id = current_user.id
    @workspace_sub.workspace_id = Workspace.find_by(slug: params[:workspace_id])
    
    if @workspace_sub.save
      render json: @workspace_sub
    else
      render json: @workspace_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace_sub = WorkspaceSub.find_by(slug: params[:slug])
    
    if @workspace_sub
      @workspace_sub.destroy
      render json: @workspace_sub
    else
      render json: ['not found'], status: 404
    end
  end

  private

  def workspace_sub_params
    params.require(:workspace_sub).permit(:workspace_id)
  end
end
