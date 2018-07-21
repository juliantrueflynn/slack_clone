class Api::UserThreadsController < ApplicationController
  def index
    @user_threads = Message.threads_with_author_id(current_user.id)
  end
end
