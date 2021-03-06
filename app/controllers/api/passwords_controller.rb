class Api::PasswordsController < ApplicationController
  def update
    is_password = current_user.is_password?(params[:password])
    current_user.password = params[:new_password]
    is_new_password = current_user.is_password?(params[:new_password])

    if is_password && is_new_password && current_user.save
      render json: '"success"'
    else
      render json: ['Password entered incorrectly'], status: 422
    end
  end
end
