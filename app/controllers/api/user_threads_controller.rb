class Api::UserThreadsController < ApplicationController
  def index
    @user_threads = current_user.thread_messages
  end
end
