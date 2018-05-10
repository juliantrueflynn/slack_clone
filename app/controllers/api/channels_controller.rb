class Api::ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :update, :destroy]

  def index
    @channels = Channel.where(workspace_id: params[:workspace_id])
  end

  def show
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render json: @channel
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    if @channel.update(channel_params)
      render json: @channel
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    if @channel
      @channel.destroy
      render json: @channel
    else
      render json: ['does not exist'], status: 404
    end
  end

  private

  def set_channel
    @channel = Channel.find_by(slug: params[:slug])
  end

  def channel_params
    params.require(:channel).permit(:title, :slug, :topic, :owner_id, :workspace_id)
  end
end
