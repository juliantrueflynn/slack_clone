class Api::DmChatsController < ApplicationController
  before_action :ensure_unique_dm_chat

  def create
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    @chatroom = workspace.channels.build(dm_chat_params)
    @chatroom.member_ids = [current_user.id, params[:dm_chat][:member_id]]

    if @chatroom.save
      render partial: 'api/channels/channel', object: @chatroom
    else
      render json: @chatroom.errors.full_messages, status: 422
    end
  end

  private

  def is_duplicate?
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    user_ids = [current_user.id, params[:dm_chat][:member_id]]
    workspace.channels.has_dm_with_user_ids?(user_ids)
  end

  def ensure_unique_dm_chat
    render json: ['DM chat already exists'], status: 422 if is_duplicate?
  end

  def dm_chat_params
    params.require(:dm_chat).permit(:member_id, :has_dm)
  end
end
