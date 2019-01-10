Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy, :show]
    resource :user, only: :create
    resources :users, only: :update, param: :slug
    resource :password, only: :update
    resource :user_appearance, only: :create

    resources :workspaces, only: [:index, :show, :create], param: :slug do
      resources :users, only: :show, param: :slug
      resources :channels, only: :index
      resource :dm_chat, only: :create
      resources :favorites, only: :index
      resources :user_threads, only: :index
      resources :user_unreads, only: :index
      resource :user_appearance, only: :destroy
      get '/search(/:query)', to: 'search#index'
    end

    resource :workspace_sub, only: [:create, :update]

    resources :channels, only: [:show, :create, :update], param: :slug do
      get '/messages(/:start_date)', to: 'messages#index'
      resource :channel_sub, only: [:update, :destroy]
    end

    resources :channel_subs, only: :create
    resources :messages, only: [:create, :update, :destroy], param: :slug
    resources :message_convos, only: :show, param: :slug
    resources :favorites, only: [:create, :destroy]
    resources :reactions, only: [:create, :destroy]
    resources :pins, only: [:create, :destroy]

    resource :read, only: [:create, :update]
    delete '/read_destroy/:readable_id/readable_type/:readable_type',
      to: 'read_destroys#destroy'
  end

  mount ActionCable.server => '/cable'

  get '*path', to: 'static_pages#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'static_pages#index'
end
