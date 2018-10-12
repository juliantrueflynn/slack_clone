class Api::AvatarsController < ApplicationController
  def update
    @avatar = User.find_by(slug: params[:user_slug])
    @avatar.is_avatar_update = true

    if @avatar.update(image_url: params[:image_url])
      render json: @avatar
    else
      render json: @avatar.errors.full_messages, status: 422
    end
  end
end
