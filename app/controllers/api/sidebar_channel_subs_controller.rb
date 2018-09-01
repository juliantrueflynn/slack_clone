class Api::SidebarChannelSubsController < ApplicationController
  def update
    @channel_sub = ChannelSub.find_by(id: params[:id])

    if @channel_sub.update(in_sidebar: true)
      render json: ['success']
    else
      render json: @channel_sub.errors.full_messages, status: 422
    end
  end

  private

  def channel_sub_params
    params.require(:sidebar_channel_sub).permit(:id)
  end
end