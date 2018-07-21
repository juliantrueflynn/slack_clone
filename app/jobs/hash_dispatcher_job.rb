class HashDispatcherJob < ApplicationJob
  queue_as :default

  def perform(channel_name:, **payload)
    ActionCable.server.broadcast channel_name, **payload
  end
end