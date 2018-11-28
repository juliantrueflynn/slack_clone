class Api::ReactionsController < ApplicationController
  def create
    @reaction = current_user.reactions.build(reaction_params)

    if @reaction.save
      render json: @reaction
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find_by(id: params[:id])

    if @reaction.destroy
      render json: @reaction
    else
      render json: ["doesn't exist"]
    end
  end

  private

  def reaction_params
    params.require(:reaction).permit(:message_id, :emoji)
  end
end
