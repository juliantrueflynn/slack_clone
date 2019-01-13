class Api::UserAppearancesController < ApplicationController
  def create
    workspace_id = params[:workspace_id]
    @user_appearance = current_user.appears.build(user_appearance_params)

    if @user_appearance.save
      render json: @user_appearance
    else
      render json: @user_appearance.errors.full_messages, status: 422
    end
  end

  def destroy
    @user_appearance = current_user.appears.by_workspace(params[:workspace_slug])

    if @user_appearance.destroy
      render json: @user_appearance
    else
      render json: ['no user'], status: 422
    end
  end

  private

  def user_appearance_params
    params.require(:user_appearance).permit(:workspace_id)
  end
end
