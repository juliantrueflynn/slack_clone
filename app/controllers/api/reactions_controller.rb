class Api::ReactionsController < ApplicationController
  before_action :set_reaction, only: [:show, :destroy]

  def show
  end

  def create
    @reaction = Reaction.new(reaction_params)
    @reaction.user_id = current_user.id

    if @reaction.save
      render 'api/reactions/show'
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    if @reaction
      @reaction.destroy
      render 'api/reactions/show'
    else
      render json: ["doesn't exist"]
    end
  end

  private

  def set_reaction
    @reaction = Reaction.find_by(params[:id])
  end

  def reaction_params
    params.require(:reaction).permit(:message_id, :emoji)
  end
end
