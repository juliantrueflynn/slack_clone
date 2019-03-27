Rails.application.config.middleware.insert_before 0, Rack::Cors do
  origins = 'https://slack-clone-julian.herokuapp.com'
  origins = 'http://localhost:3000' unless Rails.env.production?

  allow do
    origins origins
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end