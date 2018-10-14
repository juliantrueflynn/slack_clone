Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :show]
    resource :user, only: [:create]
    resources :users, only: [:update], param: :slug
    resources :reads, only: [:create, :update]
    resources :unreads, only: [:create, :update]
    resources :workspaces, only: [:index, :show, :create, :update, :destroy], param: :slug do
      resources :users, only: :show, param: :slug
      resources :channels, only: :index
      resources :favorites, only: :index
      resources :user_threads, only: :index
      resources :user_unreads, only: :index
      resources :reads, only: :index
      resource :user_appearance, only: :destroy
    end
    resource :user_appearance, only: :create
    resource :dm_chat, only: :create
    resources :workspace_subs, only: [:create, :update]
    resources :channels, only: [:show, :create, :update, :destroy], param: :slug do
      get '/recent_messages(/:start_date)', to: 'recent_messages#index'
      get '/messages(/:until_date)', to: 'messages#index'
    end
    resources :channel_subs, only: [:create, :update, :destroy]
    resources :messages, only: [:create, :update, :destroy, :show], param: :slug
    resources :favorites, only: [:create, :destroy]
    resources :reactions, only: [:show, :create, :destroy]
  end

  mount ActionCable.server => '/cable'

  get '*path', to: 'static_pages#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root to: 'static_pages#index'
end
