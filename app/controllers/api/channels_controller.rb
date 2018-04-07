class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def show
  end

  def create
  end

  def destroy
  end
end
