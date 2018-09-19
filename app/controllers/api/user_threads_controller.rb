class Api::UserThreadsController < ApplicationController
  def index
    workspace = Workspace.find_by(slug: params[:workspace_slug])
    @user_threads = []
    Message.threads_by_workspace_id_and_author_id(workspace.id, current_user.id).each do |parent|
      @user_threads << parent

      parent.replies.each do |reply|
        @user_threads << reply
      end
    end

    @user_threads
  end
end
