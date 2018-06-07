class Api::ChannelSubsController < ApplicationController
  def create
    @channel_sub = current_user.channel_subs.build
    @channel_sub.channel = Channel.find_by(slug: params[:channel_id])
    
    if @channel_sub.save
      render json: @channel_sub
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel_sub = ChannelSub.find_by(slug: params[:slug])

    if @channel_sub
      @channel_sub.destroy
      render json: @channel_sub
    else
      render json: ['not found!'], status: 404
    end
  end
end
