class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def show
    @message = Message.find_by(id: params[:id])
  end

  def create
    @message = Message.new(message_params)
    
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])

    if @message
      @message.destroy
      render json: @message
    else
      render json: ['error no message found'], status: 404
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :parent_message_id, :channel_id, :author_id)
  end
end
