class Api::UserAppearancesController < ApplicationController
  def create
    @user_appearance = current_user.appears.find_or_initialize_by(user_appearance_params)

    if @user_appearance.save
      render json: ['success']
    else
      render json: @user_appearance.errors.full_messages, status: 422
    end
  end

  def destroy
    @user_appearance = current_user.appears.find_or_initialize_by(user_appearance_params)

    if @user_appearance && @user_appearance.destroy
      render json: ['success']
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  private
  
  def user_appearance_params
    params.require(:user_appearance).permit(:workspace_slug)
  end
end
