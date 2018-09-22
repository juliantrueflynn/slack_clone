class Api::UnreadsController < ApplicationController
  def create
    @unread = Unread.new(unread_params)

    if @unread.save
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  def update
    @unread = Unread.find_by(id: params[:id])

    if @unread.update(active_at: params[:active_at])
      render 'api/unreads/show'
    else
      render json: @unread.errors.full_messages, status: 422
    end
  end

  private

  def unread_params
    params.require(:unread).permit(:unreadable_id, :unreadable_type, :active_at)
  end
end
