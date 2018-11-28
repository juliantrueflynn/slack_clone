Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy, :show]
    resource :user, only: :create
    resources :users, only: :update, param: :slug
    resource :password, only: :update
    resources :reads, only: [:create, :update, :destroy]

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

    resources :pins, only: [:create, :destroy]
    resource :user_appearance, only: :create
    resources :workspace_subs, only: [:create, :update]

    resources :channels, only: [:show, :create, :update], param: :slug do
      get '/recent_messages(/:start_date)', to: 'recent_messages#index'
      get '/messages(/:until_date)', to: 'messages#index'
      resource :channel_sub, only: [:update, :destroy]
    end

    resources :channel_subs, only: :create
    resources :messages, only: [:create, :update, :destroy, :show], param: :slug
    resources :favorites, only: [:create, :destroy]
    resources :reactions, only: [:create, :destroy]
  end

  mount ActionCable.server => '/cable'

  get '*path', to: 'static_pages#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'static_pages#index'
end
