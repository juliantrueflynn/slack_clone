class Api::RecentMessagesController < ApplicationController
  def index
    channel = Channel.find_by(slug: params[:channel_slug])
    start_date = DateTime.parse(params[:start_date])
    @recent_messages = channel.recent_messages(start_date)
  end
end