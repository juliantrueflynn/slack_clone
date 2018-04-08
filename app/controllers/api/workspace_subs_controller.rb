class Api::WorkspaceSubsController < ApplicationController
  def create
    @workspace_sub = WorkspaceSub.new(workspace_sub_params)
    
    if @workspace_sub.save
      render json: @workspace_sub
    else
      render json: @workspace_sub.errors.full_messages
    end
  end

  def destroy
    @workspace_sub = WorkspaceSub.find(params[:id])
    @workspace_sub.destroy
    render json: @workspace_sub
  end

  private

  def workspace_sub_params
    params.require(:workspace_sub).permit(:user_id, :workspace_id)
  end
end
