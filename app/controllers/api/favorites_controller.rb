class Api::FavoritesController < ApplicationController
  def index
    @favorites = current_user.favorites
  end

  def create
    @message_fav = current_user.favorites.build
    @message_fav.message_id = Message.find_by(slug: params[:message_id]).id
    
    if @message_fav.save
      render 'api/favorites/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    message = Message.find_by(slug: params[:message_slug])
    @message_fav = message.favorites.find_by(user_id: current_user.id)
    
    if @message_fav
      @message_fav.destroy
      render 'api/favorites/show'
    else
      render json: ['not found']
    end
  end
end
