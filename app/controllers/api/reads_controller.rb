class Api::ReadsController < ApplicationController
  def create
    @read = current_user.reads.build(read_params)

    if @read.save
      render 'api/reads/show'
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  def update
    @read = Read.find_by(id: params[:id])

    if @read.save
      render 'api/reads/show'
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  private
  
  def read_params
    params.require(:read).permit(:readable_id, :readable_type)
  end
end
