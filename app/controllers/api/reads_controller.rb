class Api::ReadsController < ApplicationController
  before_action :set_read, except: :create

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

  def destroy
    if @read && @read.destroy
      render 'api/reads/show'
    else
      render json: ['not found']
    end
  end

  private

  def set_read
    @read = Read.find_by(id: params[:id])
  end

  def read_params
    params.require(:read).permit(:readable_id, :readable_type)
  end
end
