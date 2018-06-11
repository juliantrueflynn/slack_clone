class ActivityEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    message_id = args[:favorite].message_id
    message = Message.find_by(id: message_id)
    channel_id = message.channel.id

    favorite = ApplicationController.render partial: 'api/message_favs/favorite',
      locals: {favorite: args[:favorite]}
    
    args[:favorite] = JSON.parse(favorite)

    ActionCable.server.broadcast("channel:#{channel_id}", args)
  end

  def render_to_json(favorite)
    ApplicationController.render partial: 'api/message_favs/favorite',
      locals: {favorite: favorite}
  end
end
