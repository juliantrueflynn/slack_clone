class Api::RecentMessagesController < ApplicationController
  def index
    channel = Channel.find_by(slug: params[:channel_slug])
    start_date = DateTime.parse(params[:start_date])
    @recent_messages = Message.created_recently(channel.id, start_date)
  end
end