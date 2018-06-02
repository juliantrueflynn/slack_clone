class UserAppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_appearances"
  end

  def unsubscribed
    current_user.appear('OFFLINE')
  end

  def online
    current_user.appear('ONLINE')
  end

  def offline
    current_user.appear('OFFLINE')
  end

  def away
    current_user.appear('AWAY')
  end
end
