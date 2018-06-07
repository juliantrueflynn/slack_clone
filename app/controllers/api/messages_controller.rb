class Api::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def show
  end

  def create
    @message = current_user.messages.build(message_params)
    @message.channel = Channel.find_by(slug: params[:channel_id])
    
    if params[:parent_message_id]  
      @message.parent_message = Message.find_by(slug: params[:parent_message_id])
    end
    
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
    if @message
      @message.destroy
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
    params.require(:message).permit(:body, :slug, :parent_message_id, :channel_id)
  end
end
