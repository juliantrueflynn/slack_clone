class Api::ChannelSubsController < ApplicationController
  before_action :set_channel_sub

  def create
    @channel_sub = current_user.channel_subs.build(channel_sub_params)

    if @channel_sub.save
      render json: ['success']
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  def update
    if @channel_sub.update(in_sidebar: !@channel_sub.in_sidebar)
      render json: ['success']
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    if @channel_sub.destroy
      render json: ['success']
    else
      render json: ['not found!'], status: 404
    end
  end

  private

  def set_channel_sub
    @channel_sub = ChannelSub.find_by(id: params[:id])    
  end

  def channel_sub_params
    params.require(:channel_sub).permit(:channel_id)
  end
end
