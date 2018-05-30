class Api::ReactionsController < ApplicationController
  before_action :set_reaction, only: [:show, :destroy]

  def show
  end

  def create
    @reaction = Reaction.new(reaction_params)

    if @reaction.save
      render json: @reaction
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    if @reaction
      @reaction.destroy
      render json: @reaction
    else
      render json: ["doesn't exist"]
    end
  end

  private

  def set_reaction
    @reaction = Reaction.find_by(params[:id])
  end

  def reaction_params
    params.require(:reaction).permit(:message_id, :user_id, :emoji)
  end
end
