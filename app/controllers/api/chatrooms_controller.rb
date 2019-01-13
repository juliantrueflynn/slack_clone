class Api::ChatroomsController < ApplicationController
  before_action :set_chatroom, only: [:show, :update]

  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    @chatrooms = workspace.chatrooms.without_dm.includes(:owner)
  end

  def show
  end

  def create
    @chatroom = current_user.created_chatrooms.build(chatroom_params)

    if @chatroom.save
      render partial: 'api/chatrooms/chatroom', object: @chatroom
    else
      render json: @chatroom.errors.full_messages, status: 422
    end
  end

  def update
    if @chatroom.update(chatroom_params)
      render json: @chatroom
    else
      render json: @chatroom.errors.full_messages, status: 422
    end
  end

  private

  def set_chatroom
    @chatroom = Chatroom.find_by_slug(params[:slug])
  end

  def chatroom_params
    params.require(:chatroom).permit(:title, :slug, :topic, :workspace_id)
  end
end
