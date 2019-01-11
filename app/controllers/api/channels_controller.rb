class Api::ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :update]

  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @channels = workspace.channels.without_dm.includes(:owner)
  end

  def show
  end

  def create
    @channel = current_user.created_channels.build(channel_params)

    if @channel.save
      render partial: 'api/channels/channel', object: @channel
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

  private

  def set_channel
    @channel = Channel.find_by(slug: params[:slug])
  end

  def channel_params
    params.require(:channel).permit(:title, :slug, :topic, :workspace_id)
  end
end
