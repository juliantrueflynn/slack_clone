class Api::DmChatsController < ApplicationController
  def create
    @channel = Channel.new(dm_chat_params)
    @channel.has_dm = true
    @channel.member_ids = params[:member_ids] << current_user.id

    if @channel.save
      render json: ['success']
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private

  def dm_chat_params
    params.require(:dm_chat).permit(:workspace_id, member_ids: [])
  end
end
