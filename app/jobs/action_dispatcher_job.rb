class ActionDispatcherJob < ApplicationJob
  queue_as :default

  def perform(type, entity)
    payload_hash = Hash[payload_name.to_sym, render_json]
    ActionCable.server.broadcast entity.broadcast_name, type: type, **payload_hash
  end

  def payload
    arguments.second
  end

  def payload_name
    payload.payload_name
  end

  def locals_hash
    Hash[payload_name.to_sym, payload]
  end

  def partial_path
    "api/#{payload_name.pluralize}/#{payload_name}"
  end

  def render_json
    json = ApplicationController.render partial: partial_path, locals: locals_hash
    return payload unless json
    JSON.parse(json)
  end
end