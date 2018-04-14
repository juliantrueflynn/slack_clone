Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show]
    resources :workspaces, only: [:index, :show, :create, :destroy] do
      resources :channels, only: :index
    end
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :channels, only: [:show, :create, :destroy]
    resources :workspace_subs, only: [:create, :destroy]
    resources :channel_subs, only: [:create, :destroy]
  end
end
