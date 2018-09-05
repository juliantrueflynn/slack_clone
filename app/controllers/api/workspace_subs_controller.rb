class Api::WorkspaceSubsController < ApplicationController
  def create
    @workspace_sub = current_user.workspace_subs.build(workspace_id: params[:workspace_id])

    if @workspace_sub.save
      render json: ['success']
    else
      render json: @workspace_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace_sub = current_user.workspace_subs.find_by(workspace_id: params[:workspace_id])
    
    if @workspace_sub && @workspace_sub.destroy
      render json: ['success']
    else
      render json: ['not found'], status: 404
    end
  end
end
