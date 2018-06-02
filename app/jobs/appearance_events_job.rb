class AppearanceEventsJob < ApplicationJob
  queue_as :default

  def perform(**args)
    ActionCable
      .server
      .broadcast(
        "user_appearances",
        args
      )
  end
end
