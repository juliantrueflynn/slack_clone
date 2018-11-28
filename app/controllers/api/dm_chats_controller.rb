class Api::DmChatsController < ApplicationController
  before_action :ensure_unique_dm_chat

  def create
    @channel = Channel.new(dm_chat_params)
    @channel.member_ids = [current_user.id, params[:dm_chat][:member_id]]

    if @channel.save
      render json: @channel
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private

  def is_duplicate_dm_chat?
    workspace_id = params[:workspace_id]
    dm_user_id = params[:dm_chat][:member_id]
    !!current_user.find_dm_chat_with_user(workspace_id, dm_user_id)
  end

  def ensure_unique_dm_chat
    render json: ['chat already exists'], status: 422 if is_duplicate_dm_chat?
  end

  def dm_chat_params
    params.require(:dm_chat).permit(:workspace_id, :member_id, :has_dm)
  end
end
