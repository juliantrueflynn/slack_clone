class Api::UnreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @unreads = workspace.unreads.where(unreadable_type: 'Channel')
  end

  def create
    @unread = Unread.new(unread_params)
    entity = @unread.unreadable_type.constantize.find_by(id: @unread.unreadable_id)
    @unread.workspace_id = entity.workspace.id

    if @unread.save
      render json: ['success']
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  def update
    @unread = Unread.find_by(id: params[:id])

    if @unread.update(active_at: params[:active_at])
      render json: ['success']
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  private

  def unread_params
    params.require(:unread).permit(:unreadable_id, :unreadable_type, :active_at)
  end
end
