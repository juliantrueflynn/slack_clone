class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_email_and_password(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      signin(@user)
      render 'api/sessions/show'
    else
      render json: ['Invalid credentials'], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render 'api/sessions/show'
    else
      render json: ['Error logging out'], status: 404
    end   
  end
end
