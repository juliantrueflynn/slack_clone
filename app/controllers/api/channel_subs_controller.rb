class Api::ChannelSubsController < ApplicationController
  before_action :set_channel_sub

  def create
    @channel_sub = current_user.channel_subs.build(params[:channel_id])

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
    @channel_sub = ChannelSub.find_by(channel_id: params[:channel_id], user_id: current_user.id)
  end

  def channel_sub_params
    params.require(:channel_sub).permit(:channel_id, :in_sidebar, :user_id)
  end
end
