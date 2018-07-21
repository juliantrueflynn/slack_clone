class Api::WorkspaceSubsController < ApplicationController
  def create
    @workspace_sub = current_user.subs.build(workspace_sub_params)

    if @workspace_sub.save
      render ['success']
    else
      render json: @workspace_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @workspace_sub = WorkspaceSub.find_by(slug: params[:slug])
    
    if @workspace_sub.destroy
      render ['success']
    else
      render json: ['not found'], status: 404
    end
  end

  private

  def workspace_sub_params
    params.require(:workspace_sub).permit(:workspace_id)
  end
end
