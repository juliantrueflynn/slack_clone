Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :show]
    resource :user, only: [:create, :update]
    resources :users, only: [:show] do
      resources :user_chat_subs, only: [:create, :update, :destroy], param: :chat_id
    end
    resources :user_threads, only: [:index]
    resource :read, only: [:update]
    resources :workspaces, only: [:index, :show, :create, :update, :destroy], param: :slug do
      resources :favorites, only: [:index]
    end
    resources :workspace_subs, only: [:create, :destroy]
    get 'workspace/:workspace_id/user_unreads', to: 'user_unreads#index'
    resource :dm_chat, only: [:create]
    resources :channels, only: [:show, :create, :update, :destroy], param: :slug
    get 'channel/:channel_id/channel_subs/:user_id', to: 'channel_subs#update'
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
