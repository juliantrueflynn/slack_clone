class Api::FavoritesController < ApplicationController
  def index
    @favorites = current_user.favorites
      .includes(message: { channel: :workspace })
      .where(workspaces: { slug: params[:workspace_slug] })
  end

  def create
    @favorite = current_user.favorites.build(message_id: params[:message_id])

    if @favorite.save
      render 'api/favorites/show'
    else
      render json: @favorite.errors.full_messages, status: 422
    end
  end

  def destroy
    @favorite = Favorite.find_by(id: params[:id])

    if @favorite.destroy
      render 'api/favorites/show'
    else
      render json: @favorite.errors.full_messages, status: 422
    end
  end
end
