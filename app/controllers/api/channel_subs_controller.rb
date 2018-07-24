class Api::ChannelSubsController < ApplicationController
  def create
    @channel_sub = current_user.subs.build(channel_id: params[:channel_id])
    
    if @channel_sub.save
      render json: ['success']
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  def update
    if @channel_sub.update(channel_sub_params)
      render json: ['success']
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel_sub = ChannelSub.find_by(channel_id: params[:channel_id], user_id: current_user.id)

    if @channel_sub.destroy
      render json: ['success']
    else
      render json: ['not found!'], status: 404
    end
  end

  private

  def channel_sub_params
    params.require(:channel_sub).permit(:channel_id, :in_sidebar)
  end
end
