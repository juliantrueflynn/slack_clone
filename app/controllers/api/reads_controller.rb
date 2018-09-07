class Api::ReadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @reads = current_user.reads.where(workspace_id: workspace.id, readable_type: 'Channel')
  end

  def create
    @read = current_user.reads.build(read_params)
    entity = @read.readable_type.constantize.find_by(id: params[:readable_id])
    @read.workspace_id = entity.workspace ? entity.workspace.id : nil
    @read.accessed_at = DateTime.now

    if @read.save
      render 'api/reads/show'
    else
      render json: @read.errors.full_messages, status: 422
    end
  end

  def update
    @read = current_user.reads.find_by(read_params)
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
