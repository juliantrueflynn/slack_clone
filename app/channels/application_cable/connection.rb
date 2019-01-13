module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
 
    def connect
      self.current_user = find_verified_user
    end
 
    private
  
    def find_verified_user
      session_token = cookies.encrypted['session_token']

      if verified_user = User.find_by_session_token(session_token)
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
