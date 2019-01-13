class Api::FavoritesController < ApplicationController
  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    @favorites = current_user.favorites.with_workspace(workspace)
  end

  def create
    @favorite = current_user.favorites.build(favorite_params)

    if @favorite.save
      render 'api/favorites/show'
    else
      render json: @favorite.errors.full_messages, status: 422
    end
  end

  def destroy
    @favorite = Favorite.find_by_id(params[:id])

    if @favorite
      @favorite.destroy
      render 'api/favorites/show'
    else
      render json: ["missing"], status: 422
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:message_id)
  end
end
