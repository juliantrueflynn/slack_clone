class Api::ReadsController < ApplicationController
  def update
    @read = Read.find_or_initialize_by(read_params) { |read| read.user_id = current_user.id }
    @read.accessed_at = DateTime.now

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
