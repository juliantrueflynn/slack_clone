class Api::ChatroomsController < ApplicationController
  before_action :set_channel, only: [:show, :update]

  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @channels = workspace.channels.without_dm.includes(:owner)
  end

  def show
  end

  def create
    @chatroom = current_user.created_chatrooms.build(channel_params)

    if @chatroom.save
      render partial: 'api/channels/channel', object: @chatroom
    else
      render json: @chatroom.errors.full_messages, status: 422
    end
  end

  def update
    if @chatroom.update(channel_params)
      render json: @chatroom
    else
      render json: @chatroom.errors.full_messages, status: 422
    end
  end

  private

  def set_channel
    @chatroom = Chatroom.find_by(slug: params[:slug])
  end

  def channel_params
    params.require(:channel).permit(:title, :slug, :topic, :workspace_id)
  end
end
