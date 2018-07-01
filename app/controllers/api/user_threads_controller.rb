class Api::UserThreadsController < ApplicationController
  def index
    # Just for dev and debugging! Remove before production!
    user = current_user || User.first 
    @user_threads = Message.threads_with_author_id(user.id)
  end
end
