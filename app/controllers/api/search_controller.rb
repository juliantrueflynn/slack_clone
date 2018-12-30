class Api::SearchController < ApplicationController
  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    channels_ids = workspace.channels_ids_with_user_id(current_user.id)
    query = params[:query]

    @messages = Message.search query,
      where: { channel_id: channels_ids },
      includes: [:channel, :author]
  end
end
