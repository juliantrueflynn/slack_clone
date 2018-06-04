class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "workspace_#{params[:workspace_slug]}"
  end

  def unsubscribed
    current_user.appear!('OFFLINE')

    action_cable
  end

  def online(data)
    current_user.appear!('ONLINE')

    action_cable
  end

  def away
    current_user.appear!('AWAY')

    action_cable
  end

  def action_cable
    workspace_slug = params[:workspace_slug]
    ActionCable.server.broadcast(
      "workspace_#{workspace_slug}",
      user: current_user, event: 'STATUS'
    )
  end
end
