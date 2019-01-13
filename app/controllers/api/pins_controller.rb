class Api::PinsController < ApplicationController
  def create
    @pin = current_user.pins.build(pin_params)

    if @pin.save
      render json: @pin
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end

  def destroy
    @pin = Pin.find_by_id(params[:id])

    if @pin
      render json: @pin.destroy
    else
      render json: ["not found"]
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:message_id)
  end
end
