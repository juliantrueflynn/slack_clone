class Api::DmChatsController < ApplicationController
  before_action :ensure_unique_dm_chat

  def create
    @channel ||= Channel.new(dm_chat_params)
    @channel.has_dm = true
    @channel.member_ids << current_user.id

    if @channel.save
      render json: ['success']
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private

  def is_duplicate_dm_chat?
    member_ids = params[:dm_chat][:member_ids]
    Channel.has_dm_subs?([current_user.id, *member_ids], params[:workspace_id])
  end

  def ensure_unique_dm_chat
    render json: ['chat already exists'], status: 422 if is_duplicate_dm_chat?
  end

  def dm_chat_params
    params.require(:dm_chat).permit(:workspace_id, member_ids: [])
  end
end
