class Api::CreateThreadMessagesController < ApplicationController
  def create
    thread = Message.find_by(slug: params[:message_slug])
    @message = current_user.messages.build(thread_message_params)
    @message.channel_id = thread.channel_id
    
    if @message.save
      thread.message_threads.create(message_id: @message.id, author_id: current_user.id)
      render json: @message
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  private

  def thread_message_params
    params.require(:message).permit(:body)
  end
end
