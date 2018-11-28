class Api::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def index
    @channel = Channel.find_by(slug: params[:channel_slug])
  end

  def show
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
    if @message.destroy
      render json: @message
    else
      render json: ['error no message found'], status: 404
    end
  end

  private

  def set_message
    @message = Message.find_by(slug: params[:slug])
  end

  def message_params
    params.require(:message).permit(:body, :channel_id, :parent_message_id)
  end
end
