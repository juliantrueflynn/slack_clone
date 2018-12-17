class Api::MessageConvosController < ApplicationController
  def show
    @message = Message.find_by(slug: params[:slug])

    render 'api/message_convos/show'
  end
end
