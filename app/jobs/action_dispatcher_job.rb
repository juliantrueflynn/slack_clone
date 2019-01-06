class ActionDispatcherJob < ApplicationJob
  queue_as :default

  def perform(entity, action_name, opts)
    action = { type: action_type(action_name) }
    action[payload_name.to_sym] = render_json
    ActionCable.server.broadcast broadcast_name, **action
  end

  def default_locals
    { locals: {}, partial: "api/#{payload_name.pluralize}/#{payload_name}" }
  end

  def new_locals
    arguments.third.except(:broadcast_name)
  end

  def broadcast_name
    arguments.third[:broadcast_name] || payload.broadcast_name
  end

  def action_type(action_name)
    type = "#{payload_name}_#{action_name}_RECEIVE"
    type.upcase
  end

  def payload
    arguments.first
  end

  def params
    args = default_locals.merge(new_locals)
    args[:locals][payload_name.to_sym] = payload
    args
  end

  def payload_name
    payload.class.name.underscore
  end

  def render_json
    json = ApplicationController.render **params
    JSON.parse(json)
  end
end