class Api::DmChatsController < ApplicationController
  after_action :broadcast

  def create
    @channel = Channel.new(dm_chat_params)
    @channel.has_dm = true
    @channel.skip_broadcast = true

    if @channel.save
      render json: ['success']
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private

  def broadcast
    member_ids = [current_user.id, *params[:member_ids]]
    subs = member_ids.map { |id| { channel_id: @channel.id, user_id: id, skip_broadcast: true } }
    @channel.subs.create(subs)
    @channel.broadcast_create
  end

  def dm_chat_params
    params.require(:dm_chat).permit(:workspace_id, :member_ids)
  end
end
