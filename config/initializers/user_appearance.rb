Rails.application.config.after_initialize do
  UserAppearance.delete_all if defined?(Rails::Server)
end