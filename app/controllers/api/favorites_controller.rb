class Api::FavoritesController < ApplicationController
  def index
    @favorites = current_user.favorites
  end

  def create
    @favorite = current_user.favorites.build
    @favorite.message_id = Message.find_by(slug: params[:message_id]).id
    
    if @favorite.save
      render 'api/favorites/show'
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    message = Message.find_by(slug: params[:message_slug])
    @favorite = message.favorites.find_by(user_id: current_user.id)
    
    if @favorite
      @favorite.destroy
      render 'api/favorites/show'
    else
      render json: ['not found']
    end
  end
end
