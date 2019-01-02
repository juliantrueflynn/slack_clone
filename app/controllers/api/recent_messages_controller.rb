class Api::RecentMessagesController < ApplicationController
  def index
    channel = Channel.find_by(slug: params[:channel_slug])
    @recent_messages = channel.older_messages(params[:start_date])
  end
end