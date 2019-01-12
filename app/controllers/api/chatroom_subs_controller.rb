class Api::ChatroomSubsController < ApplicationController
  before_action :set_chatroom_sub, except: :create

  def create
    @chatroom_sub = current_user.chatroom_subs.build(chatroom_sub_params)

    if @chatroom_sub.save
      render 'api/chatroom_subs/show'
    else
      render json: @chatroom_sub.errors.full_messages, status: 422
    end
  end

  def update
    if @chatroom_sub.update(in_sidebar: !@chatroom_sub.in_sidebar)
      render 'api/chatroom_subs/show'
    else
      render json: @chatroom_sub.errors.full_messages, status: 422
    end
  end

  def destroy
    if @chatroom_sub && @chatroom_sub.destroy
      render 'api/chatroom_subs/show'
    else
      render json: ['not found!'], status: 404
    end
  end

  private

  def set_chatroom_sub
    chatroom = Chatroom.find_by_slug(params[:chatroom_slug])
    @chatroom_sub = chatroom.subs.find_by(user_id: current_user.id)
  end

  def chatroom_sub_params
    params.require(:chatroom_sub).permit(:chatroom_id)
  end
end
