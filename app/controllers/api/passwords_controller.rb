class Api::PasswordsController < ApplicationController
  def update
    is_password = current_user.is_password?(params[:password])
    current_user.password = params[:new_password]
    is_new_password = current_user.is_password?(params[:new_password])

    if is_password && is_new_password && current_user.save
      render json: '"Your password has been updated."'
    else
      render json: ['incorrect password'], status: 422
    end
  end
end
