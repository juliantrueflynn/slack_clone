class Api::UserThreadsController < ApplicationController
  def index
    @user_threads = current_user.threads
  end
end
