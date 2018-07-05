class AppearanceJob < ApplicationJob
  queue_as :default

  def perform(**args)
    ActionCable.server.broadcast("appearance", args)
  end
end
