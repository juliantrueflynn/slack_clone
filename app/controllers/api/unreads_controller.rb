class Api::UnreadsController < ApplicationController
  before_action :set_unread, only: [:update, :destroy]

  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @unreads = current_user.unreads.where(workspace_id: workspace.id, unreadable_type: 'Channel')
  end

  def create
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @unread = current_user.unreads.build(unread_params)
    @unread.workspace_id = workspace.id

    if @unread.save
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  def update
    if @unread.save
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  def destroy
    if @unread && @unread.destroy
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  private

  def set_unread
    @unread = Unread.find_by(id: params[:id])
  end
  
  def unread_params
    params.require(:unread).permit(:unreadable_id, :unreadable_type)
  end
end
