class Api::SearchController < ApplicationController
  def index
    workspace = Workspace.find_by_slug(params[:workspace_slug])
    chatrooms_ids = workspace.chatrooms_ids_with_user_id(current_user.id)
    query = params[:query]

    @messages = Message.search query,
      where: { chatroom_id: chatrooms_ids },
      includes: [:chatroom, :author]
  end
end
