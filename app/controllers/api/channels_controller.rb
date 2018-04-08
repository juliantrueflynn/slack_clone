class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.subbed_by_user_in_workspace(current_user.id, params[:workspace_id])
  end

  def show
    @channel = Channel.find(params[:id])
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render json: @channel
    else
      render json: @channel.errors.full_messages
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    render json: @channel
  end

  private

  def channel_params
    params.require(:channel).permit(:title, :topic, :owner_id, :workspace_id)
  end
end
