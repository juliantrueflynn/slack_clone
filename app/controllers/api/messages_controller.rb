class Api::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def index
    @chatroom = Chatroom.find_by_slug(params[:chatroom_slug])
  end

  def create
    @message = current_user.messages.build(message_params)

    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    if @message && @message.destroy
      render 'api/messages/show'
    else
      render json: ['error no message found'], status: 404
    end
  end

  private

  def set_message
    @message = Message.find_by_slug(params[:slug])
  end

  def message_params
    params.require(:message).permit(:body, :chatroom_id, :parent_message_id)
  end
end
