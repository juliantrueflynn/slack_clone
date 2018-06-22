class Api::ThreadMessagesController < ApplicationController
  before_action :set_thread_message, only: [:show, :update, :delete]

  def index
    message = Message.find_by(slug: params[:message_slug])
    @thread_messages = message.thread_entries
  end

  def show
  end

  def create
    @thread_message = ThreadMessage.new(thread_message_params)

    if @thread_message
      render json: @thread_message
    else
      render json: @thread_message.errors.full_messages, status: 422
    end
  end

  def update
    if @thread_message.update(thread_message_params)
      render json: @thread_message
    else
      render json: @thread_message.errors.full_messages, status: 422
    end
  end

  def destroy
    if @thread_message
      @thread_message.destroy
      render json: @thread_message
    else
      render json: ['nothing to delete'], status: 404
    end
  end

  private

  def set_thread_message
    @thread_message = ThreadMessage.find_by(id: params[:id])
  end

  def thread_message_params
    params.require(:thread_message).permit(:body, :author_id, :parent_message_id)
  end
end
