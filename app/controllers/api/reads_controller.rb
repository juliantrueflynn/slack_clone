class Api::ReadsController < ApplicationController
  before_action :set_read, only: :update

  def create
    @read = current_user.reads.build(read_params)

    if @read.save
      render 'api/reads/show'
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  def update
    if @read.save
      render 'api/reads/show'
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  private

  def set_read
    @read = current_user.reads.find_by(
      readable_id: params[:readable_id],
      readable_type: params[:readable_type]
    )
  end

  def read_params
    params.require(:read).permit(:readable_id, :readable_type)
  end
end
