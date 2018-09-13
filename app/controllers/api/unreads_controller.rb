class Api::UnreadsController < ApplicationController
  before_action :set_unread, only: [:update]

  # def index
  #   workspace = Workspace.find_by(slug: params[:workspace_slug])
  #   @unreads = workspace.unreads.where(unreadable_type: 'Channel')
  # end

  def update
    if @unread.update(active_at: params[:active_at])
      render json: ['success']
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  private

  def set_unread
    @unread = Unread.find_by(
      unreadable_id: params[:unreadable_id],
      unreadable_type: params[:unreadable_type]
    )
  end
  
  def unread_params
    params.require(:unread).permit(:unreadable_id, :unreadable_type, :active_at)
  end
end
