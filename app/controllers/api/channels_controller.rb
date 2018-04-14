class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.where(workspace_id: params[:workspace_id])
  end

  def show
    @channel = Channel.find_by(id: params[:id])
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render json: @channel
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])

    if @channel
      @channel.destroy
      render json: @channel
    else
      render json: ['does not exist'], status: 404
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:title, :topic, :owner_id, :workspace_id)
  end
end
