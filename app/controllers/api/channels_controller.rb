class Api::ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :update, :destroy]

  def index
    user_subs = current_user.channel_subs.select(:channel_id)
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @channels = Channel.where(workspace_id: workspace.id, has_dm: false).where.not(id: user_subs)
  end

  def show
  end

  def create
    @channel = current_user.created_channels.build(channel_params)

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
    if @channel.destroy
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
    params.require(:channel).permit(:title, :slug, :topic, :workspace_id)
  end
end
