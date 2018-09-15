class Api::UserAppearancesController < ApplicationController
  def create
    @user_appearance = current_user.appears.build(workspace_slug: params[:workspace_slug])

    if @user_appearance && @user_appearance.save
      render json: ['success']
    else
      render json: @user_appearance.errors.full_messages, status: 422
    end
  end

  def destroy
    @user_appearance = current_user.appears.find_by(workspace_slug: params[:workspace_slug])

    if @user_appearance && @user_appearance.destroy
      render json: ['success']
    else
      render json: @read.errors.full_messages, status: 422
    end
  end
end
