class Api::WorkspaceSubsController < ApplicationController
  def create
    @workspace_sub = current_user.workspace_subs.build(workspace_sub_params)

    if @workspace_sub.save
      render 'api/workspace_subs/show'
    else
      render json: @workspace_sub.errors.full_messages, status: 422
    end
  end

  def update
    @workspace_sub = WorkspaceSub.find_by(id: params[:id])

    if @workspace_sub.update(is_member: !@workspace_sub.is_member)
      render 'api/workspace_subs/show'
    else
      render json: @workspace_sub.errors.full_messages, status: 422
    end
  end

  private

  def workspace_sub_params
    params.require(:workspace_sub).permit(:workspace_id)
  end
end
