class Api::ReadDestroysController < ApplicationController
  def destroy
    @read = current_user.reads.find_by(
      readable_type: params[:readable_type],
      readable_id: params[:readable_id]
    )

    if @read
      @read.destroy
      render partial: 'api/reads/read', object: @read
    else
      render json: ['not found']
    end
  end
end