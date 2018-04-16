Rails.application.routes.draw do
  root to: 'static_pages#root'
  mount ActionCable.server => '/cable'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show]
    resources :workspaces, only: [:index, :show, :create, :destroy] do
      resources :channels, only: :index
      resources :messages, only: :index
    end
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :channels, only: [:show, :create, :destroy] do
      resources :messages, only: :index
    end
    resources :workspace_subs, only: [:create, :destroy]
    resources :channel_subs, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy, :show]
  end
end
