class Api::UnreadsController < ApplicationController
  before_action :set_unread, only: [:update]

  # def index
  #   workspace = Workspace.find_by(slug: params[:workspace_slug])
  #   @unreads = workspace.unreads.where(unreadable_type: 'Channel')
  # end

  def create
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @unread = workspace.unreads.build(unread_params)
    @unread.active_at = DateTime.now

    if @unread.save
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  def update
    @unread.active_at = DateTime.now

    if @unread.save
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
