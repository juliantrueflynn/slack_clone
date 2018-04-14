class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_email_and_password(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.save
      signin(@user)
      render 'api/users/show'
    else
      render json: ['invalid credentials'], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render 'api/users/show'
    else
      render json: ['error logging out'], status: 404
    end   
  end
end
