class Api::MessageFavsController < ApplicationController
  def create
    @message_fav = MessageFav.new(message_fav_params)
    @message_fav.user_id = current_user.id
    @message_fav.message_id = Message.find_by(slug: params[:message_id]).id

    if @message_fav.save
      render 'api/message_favs/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    message = Message.find_by(slug: params[:message_slug])
    @message_fav = message.favs.find_by(user_id: current_user.id)
    
    if @message_fav
      @message_fav.destroy
      render 'api/message_favs/show'
    else
      render json: ['not found']
    end
  end

  private

  def message_fav_params
    params.require(:message_fav).permit(:message_id)
  end
end
