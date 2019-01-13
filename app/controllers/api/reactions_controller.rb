class Api::ReactionsController < ApplicationController
  before_action :ensure_unique_reaction_by_user, only: :create

  def create
    @reaction = current_user.reactions.build(reaction_params)

    if @reaction.save
      render json: @reaction
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find_by_id(params[:id])

    if @reaction
      render json: @reaction.destroy
    else
      render json: ["doesn't exist"]
    end
  end

  private

  def is_duplicate?
    current_user.reactions.exists?(reaction_params)
  end

  def ensure_unique_reaction_by_user
    render json: ['Reaction already exists'], status: 422 if is_duplicate?
  end

  def reaction_params
    params.require(:reaction).permit(:message_id, :emoji)
  end
end
