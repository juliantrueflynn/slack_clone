class UserAppearanceChannel < ApplicationCable::Channel
  def subscribed
    current_user.online
  end

  def unsubscribed
    current_user.offline
  end

  def away
    current_user.away
  end
end
