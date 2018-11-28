class Api::SearchController < ApplicationController
  def index
    workspace = Workspace.by_slug(params[:workspace_slug])
    query = params[:query]
    @messages = Message.search query,
      where: { workspace_id: workspace.id },
      includes: [:channel, :author]
  end
end
