class Api::SearchController < ApplicationController
  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    rooms_ids = workspace.chatroom_subs.chatroom_ids_with_user(current_user.id)
    query = params[:query]

    @messages = Message.search query,
      where: { chatroom_id: rooms_ids },
      includes: [:chatroom, :author]
  end
end
