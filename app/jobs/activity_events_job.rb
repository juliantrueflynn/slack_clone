class ActivityEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    message = args[:favorite].message
    channel_slug = message.channel.slug
    args[:favorite] = render_to_json(args[:favorite])
    ActionCable.server.broadcast("channel_#{channel_slug}", args)
  end

  def render_to_json(favorite)
    json_string = ApplicationController.render partial: 'api/message_favs/favorite',
      locals: {favorite: favorite}
    JSON.parse(json_string)
  end
end
