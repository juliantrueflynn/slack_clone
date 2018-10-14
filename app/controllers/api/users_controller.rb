class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  def index
    @users = User.all
  end

  def show
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      signin(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def set_user
    @user = User.find_by(slug: params[:slug])
  end

  def user_params
    params.fetch(:user, {}).permit(:email, :username, :password, :new_password, :avatar)
  end
end
