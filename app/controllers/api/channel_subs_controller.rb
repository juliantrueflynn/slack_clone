class Api::ChannelSubsController < ApplicationController
  def create
    @channel_sub = ChannelSub.new(channel_sub_params)
    if @channel_sub.save
      render json: @channel_sub
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel_sub = ChannelSub.find_by(id: params[:id])
    if @channel_sub
      @channel_sub.destroy
      render json: @channel_sub
    else
      render json: ['not found!'], status: 404
    end
  end

  private

  def channel_sub_params
    params.require(:channel_sub).permit(:channel_id, :user_id)
  end
end
