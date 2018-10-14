class ActionDispatcherJob < ApplicationJob
  queue_as :default

  def perform(entity, action_name, opts)
    action = { type: action_type(action_name) }
    action[payload_name.to_sym] = render_json
    ActionCable.server.broadcast entity.broadcast_name, **action
  end

  def default_params
    { locals: {} }
  end

  def action_type(action_name)
    type = "#{payload_name}_#{action_name}_RECEIVE"
    type.upcase
  end

  def payload
    arguments.first
  end

  def params
    args = default_params.merge(arguments.third)
    args[:locals][payload_name.to_sym] = payload
    args
  end

  def payload_name
    payload.class.name.underscore
  end

  def render_json
    partial = "api/#{payload_name.pluralize}/#{payload_name}"
    json = ApplicationController.render partial: partial, **params
    JSON.parse(json)
  end
end