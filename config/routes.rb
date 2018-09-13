Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :show]
    resource :user, only: [:create, :update]
    resources :users, only: [:show]
    resources :user_threads, only: [:index]
    resources :reads, only: [:update]
    resource :unread, only: [:update]
    resources :workspaces, only: [:index, :show, :create, :update, :destroy], param: :slug do
      resources :channels, only: [:index]
      resources :favorites, only: [:index]
      resources :unreads, only: :index
      resources :reads, only: [:index, :create]
    end
    resource :user_appearance, only: [:create, :destroy]
    resources :workspace_subs, only: [:create, :destroy], param: :workspace_id
    resources :sidebar_channel_subs, only: [:update]
    resource :dm_chat, only: [:create]
    resources :channels, only: [:show, :create, :update, :destroy], param: :slug do
      resources :messages, only: [:index]
    end
    resources :channel_subs, only: [:create, :update, :destroy], param: :channel_id
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
